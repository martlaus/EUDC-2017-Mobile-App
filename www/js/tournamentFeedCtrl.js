angular.module('starter.controllers')
    .controller('TournamentFeedCtrl', function ($scope, $http) {
     $http.get('http://188.166.104.203:7070/rest/card')
        .then(function(data) {
             $scope.cards = data.data;
             console.log('Success', data);
             }, function(err) {
              console.error('ERR', err);
            // err.status will contain the status code
        });
    });
