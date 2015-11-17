/* global angular */
// code taken and adapted from article: http://www.codelord.net/2014/06/25/generic-error-handling-in-angularjs/
// largest adaption is making the error and response success functions configurable on the app.
(function() {
    var HEADER_NAME = "ng-generic-error-handler-module";
    var specificallyHandleInProgress = false;

    var app = angular.module("ngGlobalRequestErrorHandler", []);
    app.provider("requestErrorHandler", function requestErrorHandlerProvider() {

        // default response error function
        var responseErrorFn = function (rejection, $injector) {
            var log = $injector.get("$log");
            log.error("In default request error handler, configure me!", rejection);
        }

        // default response function
        var responseFn = function(response, $injector) {
            return;
        }
        /**
         * Set the error handling function.
         * Please note that two variables are injected - the "rejection" promise and the angular $injector so you can resolve other services while error handling
         * @param {} fn The function to use for error handling
         * @returns {} 
         */
        this.setResponseErrorFn = function(fn) {
            responseErrorFn = fn;
        }

        /**
         * Set the success full response handling function. I.e to clear state after previous errors
         * @param {} fn The function to use for response handling
         * @returns {} 
         */
        this.setResponseFn = function(fn) {
            responseFn = fn;
        }

        this.$get = ["$q", "$injector",
            function ($q, $injector) {
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

                    // --- Response interceptor for handling sucessfull requests generically ---
                    response: function(response) {
                        var shouldHandle = (response && response.config && response.config.headers
                            && response.config.headers[HEADER_NAME]);

                        if (shouldHandle) {
                            responseFn(response, $injector);
                        }
                        return response;
                    },

                    // --- Response interceptor for handling errors generically ---
                    responseError: function(rejection) {
                        var shouldHandle = (rejection && rejection.config && rejection.config.headers
                            && rejection.config.headers[HEADER_NAME]);

                        if (shouldHandle) {
                            responseErrorFn(rejection, $injector);
                        }
                        return $q.reject(rejection);
                    }
                };
            }
        ];
    });

    app.config([
        "$provide", "$httpProvider", function($provide, $httpProvider) {
            $httpProvider.interceptors.push("requestErrorHandler");

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