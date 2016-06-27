'use strict';

angular
    .module('suggestionBox')
    .factory('moderateSrv', moderateSrv);

    function moderateSrv($http,$q,API,$location,user){    
    
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
    
    }