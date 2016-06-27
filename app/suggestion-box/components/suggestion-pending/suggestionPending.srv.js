'use strict';

angular
    .module('suggestionBox')
    .factory('suggestionPending',suggestionPending);

    function suggestionPending($http,$q,API){

    return {
        
        updateSuggestion: function(id,summary)
        {
            
            var data = $.param({
                id:id,
                summary:summary
            })
            
            var deferred = $q.defer();
            
            $http.put(API.url+'mysuggestions',data)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });
            
            return deferred.promise;
        }
        
    }
    
}