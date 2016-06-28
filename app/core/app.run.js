'use strict';

angular
    .module('portal')
    .run(run);

    function run($rootScope, $location){
        $rootScope.$on('$routeChangeError', function(){
            $location.path('/notfound');
        })
    }