/* global angular */
(function () {
    angular
        .module("ssValidationDecorator")
        .directive("validationMessageDecorator", validationMessageDecoratorDirective);

    validationMessageDecoratorDirective.$inject = ["$log"];
    function validationMessageDecoratorDirective ($log) {
        function linkFn(scope, element, attr) {
            scope.$watch("messagesjson", function () {
                if(scope.messagesjson) scope.messages = JSON.parse(scope.messagesjson);
            });
        }

        return {
            restrict: "A",
            scope: {
                messagesjson: "@",
                messages: "="
            },
            link: linkFn,
            replace: true,
            template: '<span class="help-block with-errors"><ul class="list-unstyled"><li ng-repeat="msg in messages track by $index">{{msg}}</li></ul></span>'
        };
    };
})();