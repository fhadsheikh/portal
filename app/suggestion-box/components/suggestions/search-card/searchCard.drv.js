'use strict';

/**
 * @ngdoc directive
 * @name suggestionboxApp.directive:search-card
 * @description
 * # header
 */
suggestionBox.directive('searchCard', function () {
        return {
          templateUrl: 'suggestion-box/components/suggestions/search-card/searchCard.view.html',
          restrict: 'E',
          replace:true,
          scope:false
        };
  });
