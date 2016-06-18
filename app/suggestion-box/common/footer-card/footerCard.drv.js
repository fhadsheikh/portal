'use strict';

/**
 * @ngdoc directive
 * @name suggestionboxApp.directive:footer
 * @description
 * # footer
 */
suggestionBox.directive('footerSuggestions', function (suggestions) {
    return {
        templateUrl: 'suggestion-box/common/footer-card/footerCard.view.html',
        restrict: 'E',
        replace:true,
        link: function(scope){
            suggestions.recentSuggestions()
            .then(function(res){
                scope.recentSuggestions = res;
            });
            
        }
    };
});