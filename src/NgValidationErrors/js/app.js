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
        "errorHandling",
        "validationDecorator"
    ]);

    module.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider.when("/", { templateUrl: "/partials/signup/signup.html", controller: "signUpCtrl" });
        $routeProvider.when("/users", { templateUrl: "/partials/users/list.html", controller: "userListCtrl" });
        $routeProvider.when("/404", { templateUrl: "/partials/404.html" });
        $routeProvider.otherwise({ redirectTo: "/404" });

        $locationProvider.html5Mode(true);
    }]);

})();