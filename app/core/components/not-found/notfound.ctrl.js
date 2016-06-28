'use strict';

angular
    .module('portal')
    .controller('NotfoundCtrl', notFoundCtrl);

    function notFoundCtrl(layout){
        
        console.log('notfoundctrl');

        var vm = this;

        // Stick footer to bottom of screen
        layout.stickyFooter(459);
    }
