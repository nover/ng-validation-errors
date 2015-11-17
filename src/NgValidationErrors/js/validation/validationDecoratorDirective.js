/* 
global angular 
global _
*/
(function () {
    angular
        .module("ssValidationDecorator", [])
        .directive("validationDecorator", validationDecoratorDirective);

    validationDecoratorDirective.$inject = ["$log", "$rootScope", "$compile"];
    function validationDecoratorDirective ($log, $rootScope, $compile) {
        function linkFn(scope, element, attrs) {
            // target da element
            $rootScope.$watch("validationErrors", watchCallback);

            function watchCallback() {
                // clean all prior validation errors
                _.forEach(element.find(".form-group"), function childDivCallback(item, idx) {
                    var $div = angular.element(item);
                    $div.removeClass("has-error");
                    var help = angular.element($div.find("span.help-block"));
                    help.attr('messagesjson', null);
                    $compile(help)(scope);
                });

                // abort if there's no errors present
                var validationErrors = $rootScope.validationErrors;
                if (!validationErrors) {
                    return;
                }

                // group the validation errors by the FieldName - servicestack returns an array of errors so there can be multiple 
                // validation error elemets for a single input field
                var vErr= _.groupBy(validationErrors, function (item) {
                    return item.FieldName;
                }, {});

                _.forEach(vErr, function(validationError, fieldName) {
                    var messages = _.map(validationError, function(item) {
                        return item.Message;
                    });

                    var $elm = element.find("input[name=" + fieldName + "]");
                    if (!$elm) {
                        return;
                    }

                    var $div = $elm.parent();
                    $div.addClass("has-error");

                    var help = angular.element($div.find("span.help-block"));
                    if (!help || help.length === 0) {
                        help = angular.element('<span validation-message-decorator/>');
                        $div.append(help);
                    }

                    help.attr("messagesjson", JSON.stringify(messages));
                    $compile(help)(scope);
                });
            }
        }
        return {
            restrict: "A",
            link: linkFn
        };
    }
})();