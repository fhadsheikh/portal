'use strict';

angular
    .module('portal')
    .controller('MainCtrl', mainCtrl);

    function mainCtrl(user,$location,$rootScope){

        var vm = this;

        vm.logout = logout;
        vm.recentSuggestions = $rootScope.recentSuggestions;
        vm.user = user.getUser();

        load();

        function logout(){
            user.logout()
            .then(function(){
                vm.user = null;
                $location.path('/');
            }, function(){
                console.log('unable to log user out');
            });
        };

        function load(){
            checkLogin();
            watchLogin();
            checkAdminPermission();
            watchAdminPermission();
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
