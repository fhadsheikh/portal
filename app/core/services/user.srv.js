'use strict';

angular
    .module('portal')
    .factory('user',user);

    function user($q,$location,$http,API,jwtHelper,store,$rootScope){

        var user = null;

        var userService = {
            getUser:getUser,
            checkLogin:checkLogin,
            isAllowed:isAllowed,
            login:login,
            logout:logout,
            signUp:signUp,
            deleteUser: deleteUser,
            getCredits: getCredits
        }

        return userService;

        //////////
        
        function getCredits(){
            
            var deferred = $q.defer();
            
            $http.get(API.bridgeUrl + 'credit')
            .then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            })
            
            return deferred.promise;
        }

        function deleteUser(pid){

            var data = $.param({
                pid:pid
            })

            var deferred = $q.defer();

            $http.post(API.url + 'user/delete', data)
            .then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            })

            return deferred.promise;
        }

        function getUser(){
            if(localStorage.getItem('jwt')){
                return jwtHelper.decodeToken(localStorage.getItem('jwt'));
            } else {
                return false;
            }

        }

        function checkLogin(){

            var deferred = $q.defer();

            if(localStorage.getItem('jwt') && !jwtHelper.isTokenExpired(localStorage.getItem('jwt'))){
                $rootScope.$broadcast('userLoggedIn', true);
                deferred.resolve('user is logged in');
            } else {
                $rootScope.$broadcast('userLoggedIn', false);
                deferred.reject('user is not logged in');
            }

            return deferred.promise;

        }

        function isAllowed(permission){

            var deferred = $q.defer();

            if(store.get('jwt') !== null){

                var jwt = jwtHelper.decodeToken(localStorage.getItem('jwt'));

                if(jwt[permission] == 1){
                    deferred.resolve('User has access');
                } else {
                    deferred.reject('Access denied');
                }
            }
            return deferred.promise;

        }

        function login(username, password){

//            var data = $.param({
//                username: username,
//                password: password
//            });

            var deferred = $q.defer();

            $http.get('http://192.168.1.142/Bridge/api/Auth?username=abc&password=def', {
                headers: {
                    'Authorization': '1l232klj4lk2j3'
                }
            })
            .then(function(res){
                store.set('jwt',res.data);
                deferred.resolve(res.data);

                user = jwtHelper.decodeToken(res.data);
                $rootScope.$broadcast('userDataChanged', {user: user});

                $location.path('/suggestions');
            }, function(err){
                deferred.reject(err);
                return err;
            });

            return deferred.promise;

        }

        function logout(){

            var deferred = $q.defer();

            if(store.get('jwt')){
                store.remove('jwt');
                deferred.resolve('User was logged out');
                $location.path('/login');
            } else {
                deferred.reject('User is already logged out');
            }

            return deferred.promise;
        }

        function signUp(username,password,firstname,lastname,title,email){

            var deferred = $q.defer();

            var data = $.param({
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                title: title,
                email: email
            });

            $http.post(API.url+'auth/user',data)
            .then(function(res){
                deferred.resolve(res);
                                console.log(res);

            }, function(err){
                deferred.reject(err);
                console.log(err);
            });

            return deferred.promise;

        }

    };
