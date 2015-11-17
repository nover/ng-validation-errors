/* global angular */
(function () {
    "use strict";
    angular
        .module("helloApp.controllers", [])
        .controller("signUpCtrl", signUpController);

    signUpController.$inject = ["$scope", "$http", "$log"];
    function signUpController ($scope, $http, $log) {
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
})();