'use strict';

/**
 * @ngdoc service
 * @name suggestionboxApp.authInjector
 * @description
 * # authInjector
 * Factory in the suggestionboxApp.
 */
portal.factory('authInjector', function () {
// Test
return {

    'request': function(config){

        config.headers.Authorization = localStorage.getItem('jwt');
        config.headers.accept = 'application/json';
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;';
        config.headers['x-requested-with'] = 'XMLHttpRequest';

        return config; 
    }

};

});
