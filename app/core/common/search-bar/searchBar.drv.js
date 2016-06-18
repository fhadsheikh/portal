'use strict';

/**
 * @ngdoc directive
 * @name suggestionboxApp.directive:search
 * @description
 * # search
 */
portal.directive('searchBar', function () {
        return {
          restrict: 'E',
          scope: {
            search: '=search'
          },
          link: function(scope){
            scope.$evalAsync(function (search) {
              scope.search.filter = search.filter
            })
          },
          templateUrl: 'core/common/search-bar/searchBar.view.html'
        };

  });