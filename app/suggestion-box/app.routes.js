'use strict';

angular
    .module('suggestionBox')
    .config(config);

    function config($routeProvider,$locationProvider,$httpProvider){
        $routeProvider
            .when('/suggestions', {
                templateUrl: 'suggestion-box/components/suggestions/suggestions.view.html',
                controller: 'SuggestionsCtrl',
                controllerAs: 'suggestions',
                resolve: {
                    authenticate: function(user){
                        return user.checkLogin() && user.isAllowed('client');
                    }
                }
            })
            .when('/suggestion/:id', {
                templateUrl: 'suggestion-box/components/suggestion/suggestion.view.html',
                controller: 'SuggestionCtrl',
                controllerAs: 'suggestion',
                resolve: {
                    authenticate: function(user){
                        return user.checkLogin() && user.isAllowed('client');
                    },
                    isApproved: function(suggestions,$location,$route){
                        return suggestions.isApproved($route.current.params.id);
                    },
                    suggestion: function(suggestions,$route){
                        return suggestions.getSuggestion($route.current.params.id);
                    },
                    messages: function(suggestions,$route){
                        return suggestions.getMessages($route.current.params.id);
                    }
                }
            })
            .when('/suggestion/pending/:id', {
                templateUrl: 'suggestion-box/components/suggestion-pending/suggestionPending.view.html',
                controller: 'SuggestionPendingCtrl',
                controllerAs: 'suggestionPending',
                resolve: {
                    authenticate: function(user){
                        return user.checkLogin() && user.isAllowed('client');
                    },
                    isPending: function(suggestions,$location,$route){
                        return suggestions.isPending($route.current.params.id)
                        .catch(function(){
                            $location.path('/notfound');
                        })
                    },
                    isOwner: function(suggestions,$location,$route){
                        return suggestions.isOwner($route.current.params.id)
                        .catch(function(){
                            $location.path('/forbidden');
                        })
                    },
                    suggestion: function(suggestions,$route){
                        return suggestions.getSuggestion($route.current.params.id);
                    },
                    messages: function(suggestions,$route){
                        return suggestions.getMessages($route.current.params.id);
                    }
                }
            })
            .when('/newsuggestion', {
                templateUrl: 'suggestion-box/components/suggestion-new/suggestionNew.view.html',
                controller: 'SuggestionNewCtrl',
                controllerAs: 'suggestionNew',
                resolve: {
                    authenticate: function(user){
                        return user.checkLogin() && user.isAllowed('client');
                    }
                }
            })
            .when('/moderate', {
                templateUrl: 'suggestion-box/components/moderate/moderate.view.html',
                controller: 'ModerateCtrl',
                controllerAs: 'moderate',
                resolve: {
                    authenticate: function(user){
                        return user.checkLogin() && user.isAllowed('admin');
                    }
                }
            })
            .when('/moderate/suggestion/:id', {
                templateUrl: 'suggestion-box/components/moderate-suggestion/moderateSuggestion.view.html',
                controller: 'ModerateSuggestionCtrl',
                controllerAs: 'moderateSuggestion',
                resolve: {
                    authenticate: function(user){
                        return user.checkLogin() && user.isAllowed('admin');
                    },
                    suggestion: function(suggestions,$route){
                        return suggestions.getSuggestion($route.current.params.id);
                    },
                    messages: function(suggestions,$route){
                        return suggestions.getMessages($route.current.params.id);
                    }
                }
            })
    }