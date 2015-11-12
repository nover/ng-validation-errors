/* global angular */
(function () {
    "use strict";
    var app = angular.module("helloApp.controllers", []);

    var controller = function ($scope, $http, $log) {
        $scope.doSignup = function (model) {
            $http.post("/signup", model)
                .then(function(data) {
                    $scope.allsOk = "yes";
                });
        }

        $scope.testFunction = function () {
            return true;
        };
    }
    controller.$inject = ["$scope", "$http", "$log"];
    app.controller("signUpCtrl", controller);
})();

