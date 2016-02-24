angular.module('starter.controllers')
    .controller('TournamentFeedCtrl', function ($scope, $http, authenticatedUserService, $state, $interval, $ionicGesture) {
        var getCardData = function() {
             $http.get(AppSettings.baseApiUrl + 'rest/card')
            .then(function (data) {
                $scope.cards = data.data;
                console.log('Success', data);
            }, function (err) {
                console.error('ERR', err);
                // err.status will contain the status code
            });
        }
        //  $http.get('http://188.166.104.203:7070/rest/card')
        getCardData();
        $interval(getCardData,2000);


 /*       $scope.onSwipeLeft = function () {
            console.log("Swiped left");
            $scope.cardDestroyed = function (index) {
                $scope.cards.splice(index, 1);
            };
        } */
    });
