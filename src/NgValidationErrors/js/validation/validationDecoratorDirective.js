/* 
global angular 
global _
*/
(function () {
    angular
        .module("validationDecorator")
        .directive("validationDecorator", validationDecoratorDirective);

    validationDecoratorDirective.$inject = ["$log", "$rootScope", "$compile"];
    function validationDecoratorDirective ($log, $rootScope, $compile) {
        function link(scope, element, attrs) {
            $log.info("in link of validation decorator directive");
            // target da element
            $rootScope.$watch("validationErrors", watchCallback);

            function watchCallback() {
                var validationErrors = $rootScope.validationErrors;
                if (!validationErrors) {
                    return;
                }

                $log.info("validation errors have changed", validationErrors);
                var vErr= _.groupBy(validationErrors, function (item) {

                    return item.FieldName;
                }, {});

                _.forEach(vErr, function(item, fieldName) {
                    $log.info(item);

                    var messages = _.map(item, function(m) {
                        return m.Message;
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
            link: link
        };
    }
})();