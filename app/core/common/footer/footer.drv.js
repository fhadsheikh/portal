'use strict';

/**
 * @ngdoc directive
 * @name suggestionboxApp.directive:footer
 * @description
 * # footer
 */
portal.directive('footer', function () {
        return {
          templateUrl: 'core/common/footer/footer.view.html',
          restrict: 'E',
          replace:true
        };
  });
