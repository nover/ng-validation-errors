/* global angular */
(function () {
    var app = angular.module("validationDecorator", []);
    app.directive("validationMessageDecorator", validationMessageDecoratorDirective);

    validationMessageDecoratorDirective.$inject = ["$log"];

    function validationMessageDecoratorDirective ($log) {
        function linkFn(scope, element, attr) {
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
            link: linkFn,
            replace:true,
            template: '<span class="help-block with-errors"><ul class="list-unstyled"><li ng-repeat="msg in messages track by $index">{{msg}}</li></ul></span>'
        };
    };
})();