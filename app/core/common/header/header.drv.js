'use strict';

/**
 * @ngdoc directive
 * @name suggestionboxApp.directive:header
 * @description
 * # header
 */
portal.directive('header', function () {
        return {
          templateUrl: 'core/common/header/header.view.html',
          restrict: 'E',
          replace:true
        };
  });
