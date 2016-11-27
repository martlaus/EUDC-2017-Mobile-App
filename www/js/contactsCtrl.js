angular.module('starter.controllers')

    .controller('contactsCtrl', function ($scope, $state, serverCallService, $ionicPopup, $timeout) {

        $scope.feedback = {};

        $scope.sendFeedback = function () {
            serverCallService.makePost(AppSettings.baseApiUrl + "rest/feedback", $scope.feedback, success, error);
        };

        function success(data) {
            $scope.feedback = null;
            showPopup();
        }

        function error() {
            console.log("Failed to send feedback");
        }

        function showPopup() {
            var myPopup = $ionicPopup.show({
                template: 'Thank you for your questions and feedback!',
                title: 'Feedback sent!',
                buttons: [
                    {
                        text: '<b>Close</b>',
                        type: 'button-positive',
                    }
                ]
            });

            $timeout(function () {
                myPopup.close(); //close the popup after 4 seconds for some reason
            }, 4000);
        }
    });
