'use strict';

angular
    .module('portal')
    .run(run);

    function run($rootScope, $location, user, $state){
        $rootScope.$on('$routeChangeError', function(){
            $location.path('/notfound');
        })
        
        $rootScope.$on('$stateChangeStart', stateChangeStart)
        
        function stateChangeStart(event, toState){
            authentication(event, toState);
            authorization(event, toState);
        }
        
        function authentication(event, toState){
            
            if(toState.protected){
                
                user.checkLogin()
                .then(function(){
                    
                }, function(){
                    $state.go('login');
                })
                
            }
            
        }
        
        function authorization(event, toState){
            
            if(toState.permission){
                
                user.isAllowed(toState.permission)
                .then(function(){
                    
                }, function(){
                    $state.go('forbidden');
                })
                
            }
            
        }
        
        
    }