'use strict';

/**
 * @ngdoc service
 * @name suggestionboxApp.suggestions
 * @description
 * # suggestions
 * Factory in the suggestionboxApp.
 */
suggestionBox.factory('moderateSrv', function ($http,$q,API,$location,user) {
    
    
    
    return {
        
        getSuggestions: function()
        {
          var defer = $q.defer();

          $http.get(API.url+'moderate/suggestions')
          .success(function onSuccess(res){
              defer.resolve(res);
          })
          .error(function onError(err){
              defer.reject(err);
          });

          return defer.promise;
        }
        
    }
    
});