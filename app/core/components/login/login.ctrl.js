'use strict';

angular
    .module('portal')
    .controller('LoginCtrl', loginCtrl)

    function loginCtrl(layout,user){

    var vm = this;

    vm.logIn = logIn;
    vm.signup = signup;

    load();

    function load(){
        height();
        stickyFooter();
    }

    function height(){
        vm.height = $(window).height();

        $(window).resize(function(){
            vm.height = $(window).height();
        })
    }

    function stickyFooter(){
        // Stick footer to bottom of screen
        layout.stickyFooter(544);
    }

    function logIn(userForm){

        // If field is prestine upon submission, make it invalid and inpristine
        layout.validateEmptyFields([userForm.username, userForm.password]);

        // Only continue with log in if form is valid (fields are filled out)
        if(userForm.$valid){

            // Log them in
            user.login(vm.credentials.username, vm.credentials.password)
            .catch(function(err){

                // check if log in failed because they're not registered
                if(err.data == 'User not registered'){

                    //Display message to client
                    vm.message = 'First time logging in?';

                    //Erase all previous alerts
                    vm.alert = null;

                    //Toggle sign up form since they're not registered already
                    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");

                } else {

                    // Display error message returned from API
                    vm.alert = err.data;

                };
            })
        }
    };

    function signup(){

        // Sign up user
        user.signUp(
            vm.credentials.username,
            vm.credentials.password,
            vm.firstname,
            vm.lastname,
            vm.title,
            vm.email
        ).then(function(res){

            // Once sign up is successful, log them in
            user.login(vm.credentials.username,vm.credentials.password);

        });
    };

}
