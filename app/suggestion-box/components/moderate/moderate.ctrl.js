'use strict';

suggestionBox.controller('ModerateCtrl', function(layout,moderateSrv,$scope,$location){
    
    moderateSrv.getSuggestions()
    .then(function(res){
        $scope.suggestions = res;
    }, function(err){
        
    });
    
    $scope.filters = [
        {name:'All',class: ''},
        {name:'Approved',class: 'moderate-btn-success'},
        {name:'Pending',class: 'moderate-btn-warning'},
        {name:'Declined',class: 'moderate-btn-danger'}
    ]
    
    $scope.setFilter = function(filter){
        
        
        $scope.filter = {};
        
        if(filter.name == 'All'){
            $scope.filter = $scope.filter.$;
        } else {
            $scope.filter.statusname = filter.name;
        }
        
    }
    
    $scope.open = function(id){
        $location.path('/suggestion/pending/'+id);
    }
    
    // Stick footer to bottom of screen
    layout.stickyFooter(459);
});