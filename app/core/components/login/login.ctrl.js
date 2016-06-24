'use strict';

/**
 * @ngdoc function
 * @name suggestionboxApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the suggestionboxApp
 */
portal.controller('LoginCtrl', function ($scope,layout,user) {

    /* LOG IN 2 */
    $scope.logIn = function(userForm){
        
        // If field is prestine upon submission, make it invalid and inpristine
        layout.validateEmptyFields([userForm.username, userForm.password]);

        // Only continue with log in if form is valid (fields are filled out)
        if(userForm.$valid){
            
            // Log them in
            user.login($scope.credentials.username, $scope.credentials.password)
            .catch(function(err){
                
                // check if log in failed because they're not registered
                if(err.data == 'User not registered'){
                    
                    //Display message to client
                    $scope.message = 'First time logging in?';
                    
                    //Erase all previous alerts
                    $scope.alert = null;
                    
                    //Toggle sign up form since they're not registered already
                    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
                    
                } else {
                    
                    // Display error message returned from API
                    $scope.alert = err.data;
                    
                };
            })
        }
    };
    
    /* SIGN UP */
    $scope.signup = function(){
        
        // Sign up user
        user.signUp(
            $scope.credentials.username,
            $scope.credentials.password,
            $scope.firstname,
            $scope.lastname,
            $scope.title,
            $scope.email
        ).then(function(res){
            
            // Once sign up is successful, log them in
            user.login($scope.credentials.username,$scope.credentials.password);
            
        });
    };
    
    $scope.height = $(window).height();
    
    $(window).resize(function(){
        $scope.height = $(window).height();
    })
    
    // Stick footer to bottom of screen
    layout.stickyFooter(544);
    
});
 