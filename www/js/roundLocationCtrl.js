angular.module('starter.controllers')

    .controller('roundLocationCtrl', function ($scope, $timeout, $ionicScrollDelegate, $http, $stateParams, $sce, $ionicPopup, authenticatedUserService, $state, $ionicGesture, serverCallService) {
        var roundLocationId = $stateParams.id;

        var getRoundLocationData = function () {
            var params = {};
            serverCallService.makeGet(AppSettings.baseApiUrl + "rest/roundlocation", params, roundLocationSuccess, error);
        };

        function roundLocationSuccess(data) {

            for (i = 0; i < data.length; i++) {
                if (data[i].id == roundLocationId) {
                    $scope.imgurl = data[i].imgurl
                    $timeout(function () {
                        $ionicScrollDelegate.scrollTo(400, 0);
                    });
                }
            }

        };

        function error() {
            // An alert dialog
            var alertPopup = $ionicPopup.alert({
                title: 'Polling failed',
                template: 'Error with polling.'
            });
            alertPopup.then(function () {

            });
        }


        getRoundLocationData();


    });