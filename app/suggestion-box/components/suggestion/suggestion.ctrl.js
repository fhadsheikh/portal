'use strict';

/**
 * @ngdoc function
 * @name suggestionboxApp.controller:SuggestionCtrl
 * @description
 * # SuggestionCtrl
 * Controller of the suggestionboxApp
 */
suggestionBox.controller('SuggestionCtrl', function ($scope,$routeParams,layout,suggestions,SweetAlert) {

    $scope.sugg = suggestions.suggestion();

    suggestions.isOwner($scope.sugg.id)
    .then(function(res){
       $scope.messages = suggestions.messages(); 
    });
    
    $scope.like = function(id)
    {
        suggestions.likeSuggestion(id)
        .then(function(){
            SweetAlert.swal('Thanks for voting!', '', 'success');
            suggestions.getSuggestion(id)
            .then(function(res){
                $scope.sugg = res;
            })
        });
    };
    
    $scope.submitMessage = function()
    {
        suggestions.submitMessage($scope.sugg.id, $scope.newMessage)
        .then(function(res){
            suggestions.getMessage(res.id)
            .then(function(res){
                $scope.messages.unshift(res);
                $scope.newMessage = null;
                SweetAlert.swal('Message Sent!', 'You will receive an email notification when responded to.', 'success');

            })
            .catch(function(err){
                console.log(err);
            });
        })
        .catch(function(err){
            console.log(err);
        });
    };
    

    
    // Stick footer to bottom of screen
    layout.stickyFooter(544);
    
  });
