'use strict';

angular
    .module('portal')
    .controller('ManageUsersCtrl', manageUsersCtrl);

    function manageUsersCtrl(layout, user, manageUsers){


        var vm = this;

        vm.deleteUser = deleteUser;

        load();

        function load(){
            getUsers();
            stickyFooter();
        }

        function deleteUser(pid){
            user.deleteUser(pid)
            .then(function(res){
                console.log(res);
            })
        }

        function getUsers(){

            manageUsers.getUsers()
            .then(function(res){
                vm.users = res;
            });

        }

        function stickyFooter(){
            // Stick footer to bottom of screen
            layout.stickyFooter(411);
        }

    }
