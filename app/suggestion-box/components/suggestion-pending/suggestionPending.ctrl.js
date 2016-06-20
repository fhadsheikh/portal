'use strict';

/**
 * @ngdoc function
 * @name suggestionboxApp.controller:PendingsuggestionCtrl
 * @description
 * # PendingsuggestionCtrl
 * Controller of the suggestionboxApp
 */
suggestionBox.controller('SuggestionPendingCtrl', function (layout,$scope,suggestions,SweetAlert) {
    
    $scope.sugg = suggestions.suggestion();
    
    $scope.messages = suggestions.messages();
    
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
    layout.stickyFooter(690);
  });
