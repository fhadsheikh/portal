'use strict';

angular
    .module('portal')
    .controller('MainCtrl', mainCtrl);

    function mainCtrl(user,$state,$rootScope){

        var vm = this;

        vm.logout = logout;
        vm.recentSuggestions = $rootScope.recentSuggestions;
        vm.user = user.getUser();

        load();

        function logout(){
            user.logout()
            .then(function(){
                vm.user = null;
                $state.go('login');
            }, function(){
                console.log('unable to log user out');
            });
        };

        function load(){
            checkLogin();
            watchLogin();
            checkAdminPermission();
            watchAdminPermission();
            checkCredits();
            watchVote();
        }
        
        function checkCredits(){
            user.getCredits()
            .then(function(res){
                vm.credits = res.data;
            })
        }
        
        function watchVote(){
            $rootScope.$on('userVoted', function(event,args){
                 user.getCredits()
                .then(function(res){
                    vm.credits = res.data;
                })
            })
        }

        function checkLogin(){
            user.checkLogin()
            .then(function(){
                vm.loggedin = true;
            }, function(){
                vm.loggedin = false;
            })
        }

        function watchLogin(){
            $rootScope.$on('userLoggedIn',function(event,args){
                if(args){
                    vm.loggedin = true;
                } else {
                    vm.loggedin = false;
                }
            });
        }

        function checkAdminPermission(){
            user.isAllowed('admin')
            .then(function(res){
                vm.isAdmin = true;
            }, function(){
                vm.isAdmin = false;
            });
        }

        function watchAdminPermission(){
            $rootScope.$on('userDataChanged', function(e,a){
                vm.user = a.user;
                // Check if user is Admin
                user.isAllowed('admin')
                .then(function(res){
                    vm.isAdmin = true;
                }, function(){
                    vm.isAdmin = false;
                });

            });

        }

    }
