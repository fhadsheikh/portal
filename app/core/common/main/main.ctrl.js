'use strict';

/**
 * @ngdoc function
 * @name suggestionboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the suggestionboxApp
 */
portal.controller('MainCtrl', function ($scope,user,$location,$rootScope) {
    
        var parent = this;
    
        parent.user = user.getUser();
        
        $rootScope.$on('userLoggedIn',function(event,args){            
            if(args){
                parent.loggedin = true;
            } else {
                parent.loggedin = false;
            }
        });
    
        user.checkLogin()
        .then(function(){
            parent.loggedin = true;
        }, function(){
            parent.loggedin = false;
        })
    
        $rootScope.$on('userDataChanged', function(e,a){
            parent.user = a.user; 
            // Check if user is Admin
            user.isAllowed('admin')
            .then(function(res){
                parent.isAdmin = true;
            }, function(){
                parent.isAdmin = false;
            });
            
        });
    
        // Check if user is Admin
        user.isAllowed('admin')
        .then(function(res){
            parent.isAdmin = true;
        }, function(){
            parent.isAdmin = false;
        });
    
        parent.recentSuggestions = $rootScope.recentSuggestions;
    
    // Insert this into suggestions page . not here.
//        suggestions.recentSuggestions()
//        .then(function(res){
//            parent.recentSuggestions = res;
//        });
        
        parent.logout = function(){
            user.logout();
            parent.user = null;
            $location.path('/');
        };
    

    });
