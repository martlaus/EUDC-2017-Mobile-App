angular.module('starter.controllers')
    .controller('TournamentFeedCtrl', function ($scope, $http, authenticatedUserService, $state, $interval, $ionicGesture, serverCallService, $ionicPopup,$ionicListDelegate) {
        $scope.destroyCard = function (index) {
            $scope.cards.splice(index, 1);
        };
        var getCardData = function () {
            var params = {};

            serverCallService.makeGet(AppSettings.baseApiUrl + "rest/card", params, success, error);
        }
        $scope.doRefresh = function () {
            getCardData();
        }
        function success(data) {
            $scope.cards = data;
        }
        function error() {
            // An alert dialog
            var alertPopup = $ionicPopup.alert({
                title: 'Polling failed',
                template: 'Error with polling.'
            });
            alertPopup.then(function () {

            })
        }

        getCardData();
        $interval(getCardData, 90000);
    });
