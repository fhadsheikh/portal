'use strict';

angular
    .module('portal')
    .factory('authInjector', authInjector);

    function authInjector(){

        var authInjector = {
            request: request
        }

        return authInjector;

        //////////

        function request(config){

            config.headers.Authorization = localStorage.getItem('jwt');
            config.headers.accept = 'application/json';
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;';
            config.headers['x-requested-with'] = 'XMLHttpRequest';

            return config;

        }

    }
