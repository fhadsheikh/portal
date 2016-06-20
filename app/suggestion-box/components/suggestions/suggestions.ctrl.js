'use strict';

/**
 * @ngdoc function
 * @name suggestionboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the suggestionboxApp
 */
suggestionBox.controller('SuggestionsCtrl', function ($scope,$location,suggestions,layout,$timeout) {

    // For search directive
    $scope.search = {
        title: 'Suggestions',
        description: 'Vote for suggestions that you would like to see added into ClockWork',
        filter: 'search',
        placeHolder: 'Search Suggestions'
    }

    $scope.viewMySuggestions = function()
    {
        suggestions.getMySuggestions().then(function(res){
            console.log(res);
            $scope.suggestions = res;
            $scope.count = res.length;
            $scope.mySuggestions = false;
            $scope.allSuggestions = true;
        });
    };

    $scope.viewAllSuggestions = function()
    {
        suggestions.getSuggestions().then(function(res){
            $scope.suggestions = res;
            $scope.count = res.length;
            $scope.mySuggestions = true;
            $scope.allSuggestions = false;
        });
    };

    $scope.openSuggestion = function(sugg){
        if(sugg.status === '1'){
            $location.path('/suggestion/'+sugg.id);
        } else {
            $location.path('/suggestion/pending/'+sugg.id);
        }
    };

    $scope.sortPopular = function(item)
    {
        $scope.order = item;
        $scope.selectedSort = item;
    };


    $scope.sortClass = function(item)
    {
        if(item === $scope.selectedSort || '-'+item === $scope.selectedSort){return 'selectedSort';}
    };

    $scope.viewAllSuggestions();

    $scope.sortPopular('-votes');

//    $scope.loadMore = function(){
//        if($scope.loadBusy) return;
//        $scope.loadBusy = true;
//
//
//
//        $scope.loadBusy = false;
//
//    };

    // Stick footer to bottom of screen
    layout.stickyFooter(730);

  });
