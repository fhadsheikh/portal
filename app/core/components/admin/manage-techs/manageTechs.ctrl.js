'use strict';

angular
    .module('portal')
    .controller('ManageTechsCtrl', manageTechsCtrl);

    function manageTechsCtrl(layout, user){


        var vm = this;

        vm.permissions = user.getUser().permissions || false;
        vm.selectTab = selectTab;

        load();

        function selectTab(tab){
            vm.selectedTab = tab;
        }

        function load(){
            stickyFooter();
        }

        function stickyFooter(){
            // Stick footer to bottom of screen
            layout.stickyFooter(411);
        }

    }
