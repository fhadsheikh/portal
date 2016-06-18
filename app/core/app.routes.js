'use strict';

portal.config(function($routeProvider,$locationProvider,$httpProvider){
    $routeProvider
    .when('/login', {
        templateUrl: 'core/components/login/login.view.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve: {
            loggedIn: function(user,$location){
                user.checkLogin().then(function(){
                    $location.path('/suggestions');
                })
            }
        }
    })
    .when('/forbidden', {
        templateUrl: 'core/components/forbidden/forbidden.view.html',
        controller: 'ForbiddenCtrl',
        ControllerAs: 'forbidden'
    })
    .when('/notfound', {
        templateUrl: 'core/components/not-found/notfound.view.html',
        controller: 'NotfoundCtrl',
        controllerAs: 'notfound'
    })
    .otherwise({
        redirectTo: '/suggestions'
    });

    // Send Authorization header with JWT with each request
    $httpProvider.interceptors.push('authInjector');

    // Enable html5Mode to remove "#" from URLs
    $locationProvider.html5Mode(true);
})