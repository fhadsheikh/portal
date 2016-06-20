'use strict';

/**
 * @ngdoc service
 * @name suggestionboxApp.suggestions
 * @description
 * # suggestions
 * Factory in the suggestionboxApp.
 */
suggestionBox.factory('suggestions', function ($http,$q,API,$location,user) {

    var suggestion = null;

    var messages = null;

    return {

        suggestion: function()
        {
            return suggestion;
        },
        messages: function()
        {
            return messages;
        },
        getSuggestions: function ()
        {

          var defer = $q.defer();

          $http.get(API.url+'suggestions')
          .success(function onSuccess(res){
              defer.resolve(res);
          })
          .error(function onError(err){
              defer.reject(err);
              $location.path('/login');
          });

          return defer.promise;

        },
        getSuggestion: function(id)
        {

            var deferred = $q.defer();
                $http.get(API.url+'suggestion?id='+id)
                .success(function onSuccess(res){
                    suggestion = res;
                    deferred.resolve(res);
                })
                .error(function onError(err){
                    deferred.reject(err);
                });

            return deferred.promise;

        },
        getMySuggestions: function()
        {

            var deferred = $q.defer();

            $http.get(API.url+'mysuggestions')
            .success(function onSuccess(res){
                deferred.resolve(res);
            })
            .error(function onError(err){
                deferred.reject(err);
                $location.path('/login');
            });

            return deferred.promise;
        },
        newSuggestion: function(title,summary)
        {

            var data = $.param({
                title: title,
                summary: summary
            });

            var deferred = $q.defer();

            $http.post(API.url + 'suggestion', data)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        },
        likeSuggestion: function(id)
        {

            var data = $.param({
                id: id
            });

            var deferred = $q.defer();

            $http.post(API.url + 'suggestion/vote',data)
            .success(function(res){
                console.log(res);
                deferred.resolve(res);
            })
            .error(function(err){
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;
        },
        getMessages: function(id)
        {

            var deferred = $q.defer();

            $http.get(API.url + 'suggestion/messages?id='+id)
            .success(function(res){
                messages = res;
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        },
        submitMessage: function(id,message)
        {
            var data = $.param({
                id: id,
                message: message
            });

            var deferred = $q.defer();

            $http.post(API.url + 'suggestion/message',data)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject();
            });

            return deferred.promise;

        },
        getMessage: function(id)
        {
            var deferred = $q.defer();

            $http.get(API.url + 'suggestion/message?id='+id)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        },
        recentSuggestions: function()
        {
            var deferred = $q.defer();

            $http.get(API.url + 'suggestions/recent')
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        },
        isPending: function(id)
        {
            var deferred = $q.defer();

            $http.get(API.url + 'suggestion/checkpending?id='+id)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        },
        isApproved: function(id)
        {
            var deferred = $q.defer();

            $http.get(API.url + 'suggestion/checkapproved?id='+id)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        },
        isOwner: function(id)
        {
            var deferred = $q.defer();

            $http.get(API.url + 'suggestion/isowner?id='+id)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };
  });
