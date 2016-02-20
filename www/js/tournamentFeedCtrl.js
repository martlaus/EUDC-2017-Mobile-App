angular.module('starter.controllers')
    .controller('TournamentFeedCtrl', function ($scope, $http, authenticatedUserService, $state, $interval, $ionicSwipeCardDelegate) {
        var getCardData = function() {
             $http.get('http://localhost:7070/rest/card')
            .then(function (data) {
               // $scope.cards = Array.prototype.slice.data.data;
                $scope.cards = data.data;
                console.log('Success', data);
            }, function (err) {
                console.error('ERR', err);
                // err.status will contain the status code
            });
        }
        //  $http.get('http://188.166.104.203:7070/rest/card')
        getCardData();
        $interval(getCardData,20000000);
        
        $scope.cardSwiped = function(index) {
        };
        
        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
        };
    });
