'use strict';

angular
    .module('portal')
    .config(config);

    function config($routeProvider,$locationProvider,$httpProvider){
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
        .when('/admin', {
            redirectTo: '/admin/manage-users'
        })
        .when('/admin/manage-users', {
            templateUrl: 'core/components/admin/manage-users/manageUsers.view.html',
            controller: 'ManageUsersCtrl',
            controllerAs: 'manageUsers',
            resolve: {
                authenticate: function(user){
                    return user.checkLogin() && user.isAllowed('admin');
                }
            }
        })
        .when('/admin/manage-techs', {
            templateUrl: 'core/components/admin/manage-techs/manageTechs.view.html',
            controller: 'ManageTechsCtrl',
            controllerAs: 'manageTechsCtrl',
            resolve: {
                authenticate: function(user){
                    return user.checkLogin() && user.isAllowed('admin');
                }
            }
        })
        .otherwise({
            redirectTo: '/suggestions'
        });

        // Send Authorization header with JWT with each request
        $httpProvider.interceptors.push('authInjector');

        // Enable html5Mode to remove "#" from URLs
        $locationProvider.html5Mode(true);
    }
