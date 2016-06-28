'use strict';

angular
    .module('portal')
    .run(run);

    function run($rootScope, $location, user){
        
        $rootScope.$on('$routeChangeError', function(){
            console.log('route change error');
            $location.path('/login');
        });
        
        $rootScope.$on('$routeChangeStart', function(event, next, current){
            
            if(next.$$route.originalPath != '/login'){
                
                var u = user.getUser();
                
                if(u.permissions.client == 0){
                    $location.path('/account-pending');
                }
                
            }
            
        });
        
        
    }