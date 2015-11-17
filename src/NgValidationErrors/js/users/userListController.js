/* global angular */
(function () {
    "use strict";
    angular.module('users.controllers', [])
        .controller('userListCtrl', userListController);

    userListController.$inject = ["$scope", "$http", "$log"];
    function userListController($scope, $http, $log) {
        $log.info("user list ctrl");
        $http.get("/userList")
            .then(function(response) {
                $scope.users = response.data;
            });
    };
})();