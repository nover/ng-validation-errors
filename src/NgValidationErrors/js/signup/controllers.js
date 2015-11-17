/* global angular */
(function () {
    "use strict";
    angular
        .module("helloApp.controllers", [])
        .controller("signUpCtrl", signUpController);

    signUpController.$inject = ["$scope", "$http", "$log", "toastr"];
    function signUpController ($scope, $http, $log, toast) {
        $scope.doSignup = function (model) {
            $http.post("/signup", model)
                .then(function(response) {
                    toast.success('User with id: ' + response.data.Id + ' created', 'Alls ok');
                });
        }

        $scope.testFunction = function () {
            return true;
        };
    }
})();