/* global angular */
(function () {
    var app = angular.module("validationDecorator", []);

    var validationDecoratorDirective = function ($log, $rootScope) {
        function link(scope, element, attrs) {
            $log.info("in link of validation decorator directive");
            // target da element
            $rootScope.$watch("validationErrors", function () {
                var validationErrors = $rootScope.validationErrors;
                if (!validationErrors) {
                    return;
                }

                $log.info("validation errors have changed", validationErrors);
                validationErrors.forEach(function(item) {
                    var $elm = element.find("input[name=" + item.FieldName + "]");
                    if (! $elm) {
                        return;
                    }

                    $elm.attr("data-is-valid", false);
                    $elm.attr("data-error-code", item.ErrorCode);
                });
            });
        }

        return {
            restrict: "A",
            link: link
        };
    }
    validationDecoratorDirective.$inject = ["$log", "$rootScope"];
    app.directive("validationDecorator", validationDecoratorDirective);
})();