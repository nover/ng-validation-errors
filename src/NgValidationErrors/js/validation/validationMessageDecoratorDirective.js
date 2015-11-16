/* global angular */
(function () {
    var app = angular.module("validationDecorator", []);
    var validationMessageDecoratorDirective = function($log) {
        function link(scope, element, attr) {
            $log.info("inside val msg decorator linker");
            scope.$watch('messagesjson', function () {
                if(scope.messagesjson) scope.messages = JSON.parse(scope.messagesjson);
            });
        }

        return {
            restrict: "A",
            scope: {
                messagesjson: "@",
                messages: "="
            },
            link: link,
            replace:true,
            template: '<span class="help-block with-errors"><ul class="list-unstyled"><li ng-repeat="msg in messages track by $index">{{msg}}</li></ul></span>'
        };
    };

    validationMessageDecoratorDirective.$inject = ["$log"];

    app.directive("validationMessageDecorator", validationMessageDecoratorDirective);
})();