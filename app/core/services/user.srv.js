'use strict';

/**
 * @ngdoc service
 * @name suggestionboxApp.user
 * @description
 * # user
 * Factory in the suggestionboxApp.
 */
portal.factory('user', function ($q,$location,$http,API,jwtHelper,store,$rootScope) {
    
    var user = null;
        
    return {
        
        getUser: function(){
            if(localStorage.getItem('jwt')){
                return jwtHelper.decodeToken(localStorage.getItem('jwt')).data;
            } else {
                return false;
            }
            
        },
        
        checkLogin: function(){
            
            var deferred = $q.defer();
                        
            if(localStorage.getItem('jwt') && !jwtHelper.isTokenExpired(localStorage.getItem('jwt'))){
                $rootScope.$broadcast('userLoggedIn', true);
                deferred.resolve('user is logged in');
            } else {
                $rootScope.$broadcast('userLoggedIn', false);
                $location.path('/login');
                deferred.reject('user is not logged in');
            }
            
            return deferred.promise;
            
        },
        isAllowed: function(permission){
            
            var deferred = $q.defer();
            
            if(store.get('jwt') !== null){
                
                var jwt = jwtHelper.decodeToken(localStorage.getItem('jwt'));

                if(jwt.data.permissions[permission] == 1){
                    deferred.resolve('User has access');
                } else {
                    deferred.reject('Access denied');
                }
            }
            return deferred.promise;
            
        },
        login: function(username, password){
            
            var data = $.param({
                username: username,
                password: password
            });
            
            var deferred = $q.defer();
            
            $http.post(API.url+'auth', data)
            .then(function(res){
                store.set('jwt',res.data);
                deferred.resolve(res.data);
                
                user = jwtHelper.decodeToken(res.data).data;
                $rootScope.$broadcast('userDataChanged', {user: user});
                
                $location.path('/suggestions');
            }, function(err){
                deferred.reject(err);
                return err;
            });
            
            return deferred.promise;
            
        },
        logout: function(){
            
            var deferred = $q.defer();
            
            if(store.get('jwt')){
                store.remove('jwt');
                deferred.resolve('User was logged out');
                $location.path('/login');
            } else {
                deferred.reject('User is already logged out');
            }
            
            return deferred.promise;
        },
        signUp: function(username,password,firstname,lastname,title,email){
            
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
            }, function(err){
                deferred.reject(err);
            });
            
            return deferred.promise;
            
        }
        
    };
  });
