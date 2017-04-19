angular.module('starter.controllers')

    .controller('TournamentFeedCtrl',
        function ($location, $scope, $http, authenticatedUserService, $state, $interval, $ionicGesture, serverCallService, $ionicPopup, $timeout) {

            $scope.shouldShowDelete = false;
            $scope.listCanSwipe = true;

            $scope.goToCardDetail = function (card) {
                $state.go('app.card', {
                    'card': card
                });
            };

            // Timer card related functions
            $scope.timerRunning = true;

            $scope.startTimer = function () {
                $scope.$broadcast('timer-start');
                $scope.timerRunning = true;
            };

            $scope.stopTimer = function () {
                $scope.$broadcast('timer-stop');
                $scope.timerRunning = false;
            };

            $scope.destroyCard = function (card) {

                for (i = 0; i < this.cards.length; i++) {
                    if (this.cards[i] == card) {
                        this.cards.splice(i, 1);
                        cardId = card.id;
                        params = {
                            token: headers.Token
                        };
                        serverCallService.makeDelete(AppSettings.baseApiUrl + "rest/card/" + cardId, params, success, error);

                        function success() {
                            console.log('Deletion successful');
                        }

                        function error() {
                            console.log('Deletion failed');
                        }
                    }

                }
            };

            var getCardData = function () {
                var params = {};
                serverCallService.makeGet(AppSettings.baseApiUrl + "rest/card", params, success, error);
            };

            var getTimerCardData = function () {
                var params = {};
                serverCallService.makeGet(AppSettings.baseApiUrl + "rest/timercard", params, timercardSuccess, error);
            };

            $scope.doRefresh = function () {
                getTimerCardData();
                getCardData();
                $scope.$broadcast('scroll.refreshComplete');
            };

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

                });
            }

            function timercardSuccess(data) {
                $scope.timercards = data;
                if (data[0]) {
                    // takes the first element from array(should be only one timercard at once for one person)
                    $scope.endDate = data[0].endDate;
                    
                    var timercardId = data[0].id;
                    
                    var currentDate = new Date();
                    var endDate = new Date(data[0].endDate);
                    //checks if there is less than 15 minutes between current time and timercard end time
                    if (endDate - currentDate <= 900000) {
                        $scope.time = "time-alert";
                    }

                    if (endDate <= currentDate) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Final round notice',
                            template: 'Your round has now started.'
                        });
                        alertPopup.then(function () {
                            var params = {};

                            $timeout(function () {
                                $scope.timercards.splice(0, 1);
                                serverCallService.makeDelete(AppSettings.baseApiUrl + "rest/timercard/" + timercardId, params, success, error);
                            }, 60 * 1000 * 10);

                            function success() {
                                console.log('Deletion successful');
                            }

                            function error() {
                                console.log('Deletion failed');
                            }
                        });
                    }
                }
            }

            getTimerCardData();
            getCardData();
            $interval(getCardData, 90000);
            //TODO: We need to query user specific timercards

            // $interval(getTimerCardData, 90000);
        });