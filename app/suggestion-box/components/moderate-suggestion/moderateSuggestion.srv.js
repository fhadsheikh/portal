'use strict';

/**
 * @ngdoc service
 * @name suggestionboxApp.suggestions
 * @description
 * # suggestions
 * Factory in the suggestionboxApp.
 */
suggestionBox.factory('moderateSuggestion', function ($http,$q,API,$location,user) {

    return {

        changeStatus: function(id,status)
        {
            var data = $.param({
                suggestionID: id,
                status: status
            });

            var deferred = $q.defer();

            $http.post(API.url + 'moderate/updatestatus',data)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        }

    }
});
