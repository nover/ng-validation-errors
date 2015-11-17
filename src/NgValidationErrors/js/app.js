/* global angular */
(function () {
    "use strict";
    // Declare app level module which depends on filters, and services
    var module = angular.module("helloApp", [
        "ngRoute",
        "ngAnimate",
        "toastr",
        "helloApp.controllers",
        "navigation.controllers",
        "users.controllers",
        "ngGlobalRequestErrorHandler",
        "ssValidationDecorator"
    ]);

    module.config(["$routeProvider", "$locationProvider", "requestErrorHandlerProvider", function ($routeProvider, $locationProvider, requestErrorHandlerProvider) {
        $routeProvider.when("/", { templateUrl: "/partials/signup/signup.html", controller: "signUpCtrl" });
        $routeProvider.when("/users", { templateUrl: "/partials/users/list.html", controller: "userListCtrl" });
        $routeProvider.when("/404", { templateUrl: "/partials/404.html" });
        $routeProvider.otherwise({ redirectTo: "/404" });

        $locationProvider.html5Mode(true);

        requestErrorHandlerProvider.setResponseFn(function (response, $injector) {
            var rootScope = $injector.get("$rootScope");
            rootScope.validationErrors = null;
        });

        requestErrorHandlerProvider.setResponseErrorFn(function(rejection, $injector) {
            var toastr = $injector.get("toastr");
            var $rootScope = $injector.get("$rootScope");
            if (rejection.status === 500) {
                var msg = "Something terrible went wrong there.";
                if (rejection.data.ResponseStatus) {
                    msg = rejection.data.ResponseStatus.Message;
                }
                toastr.error(msg, "Server is haywire");
            } else if (rejection.status === 400) { // user provided garbage!
                $rootScope.validationErrors = rejection.data.ResponseStatus.Errors;

            } else {
                toastr.error("Seems like you killed the server - we are working on it", "Error");
            }
        });
    }]);

})();