/* global angular */
// code taken and adapted from article: http://www.codelord.net/2014/06/25/generic-error-handling-in-angularjs/
(function() {
    var HEADER_NAME = "MyApp-Handle-Errors-Generically";
    var specificallyHandleInProgress = false;

    var app = angular.module("errorHandling", []);

    var requestErrorHandlerFactory = function($q, $log, $injector, $rootScope) {
        return {
            // --- The user's API for claiming responsiblity for requests ---
            specificallyHandled: function(specificallyHandledBlock) {
                specificallyHandleInProgress = true;
                try {
                    return specificallyHandledBlock();
                } finally {
                    specificallyHandleInProgress = false;
                }
            },

            // --- Response interceptor for handling errors generically ---
            responseError: function(rejection) {
                var shouldHandle = (rejection && rejection.config && rejection.config.headers
                    && rejection.config.headers[HEADER_NAME]);

                if (shouldHandle) {
                    $log.error(rejection);
                    var toastr = $injector.get("toastr");

                    if (rejection.status === 500) {
                        var msg = "Something terrible went wrong there.";
                        if (rejection.data.ResponseStatus) {
                            msg = rejection.data.ResponseStatus.Message;
                        }
                        toastr.error(msg, "Server is haywire");
                    } else if (rejection.status === 400) { // user provided garbage!
                        //TODO hand the rejection over to the validation Error Decorator
                        $rootScope.validationErrors = rejection.data.ResponseStatus.Errors;

                    } else {
                        toastr.error("Seems like you killed the server - we are working on it", "Error");
                    }
                }
                return $q.reject(rejection);
            }
        };
    };
    requestErrorHandlerFactory.$inject = ["$q", "$log", "$injector", "$rootScope"]; 
    app.factory("RequestsErrorHandler", requestErrorHandlerFactory);

    app.config([
        "$provide", "$httpProvider", function($provide, $httpProvider) {
            $httpProvider.interceptors.push("RequestsErrorHandler");

            // --- Decorate $http to add a special header by default ---

            function addHeaderToConfig(config) {
                config = config || {};
                config.headers = config.headers || {};

                // Add the header unless user asked to handle errors himself
                if (!specificallyHandleInProgress) {
                    config.headers[HEADER_NAME] = true;
                }

                return config;
            }

            // The rest here is mostly boilerplate needed to decorate $http safely
            $provide.decorator("$http", [
                "$delegate", function($delegate) {
                    function decorateRegularCall(method) {
                        return function(url, config) {
                            return $delegate[method](url, addHeaderToConfig(config));
                        };
                    }

                    function decorateDataCall(method) {
                        return function(url, data, config) {
                            return $delegate[method](url, data, addHeaderToConfig(config));
                        };
                    }

                    function copyNotOverriddenAttributes(newHttp) {
                        for (var attr in $delegate) {
                            if (!newHttp.hasOwnProperty(attr)) {
                                if (typeof ($delegate[attr]) === "function") {
                                    newHttp[attr] = function() {
                                        return $delegate[attr].apply($delegate, arguments);
                                    };
                                } else {
                                    newHttp[attr] = $delegate[attr];
                                }
                            }
                        }
                    }

                    var newHttp = function(config) {
                        return $delegate(addHeaderToConfig(config));
                    };

                    newHttp.get = decorateRegularCall("get");
                    newHttp.delete = decorateRegularCall("delete");
                    newHttp.head = decorateRegularCall("head");
                    newHttp.jsonp = decorateRegularCall("jsonp");
                    newHttp.post = decorateDataCall("post");
                    newHttp.put = decorateDataCall("put");

                    copyNotOverriddenAttributes(newHttp);

                    return newHttp;
                }
            ]);
        }
    ]);
})();