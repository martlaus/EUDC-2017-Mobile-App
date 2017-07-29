angular.module('starter.controllers')
    .controller('LoginCtrl', function ($scope, $state, serverCallService, authenticatedUserService, $ionicPopup, $rootScope) {
        if (authenticatedUserService.isAuthenticated() ) {
            $state.go("app.tournamentFeed");
        }
        $scope.loginData = {};
        $scope.isSubmitted = false;

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            $scope.isSubmitted = true;
            var user = {
                email: $scope.loginData.email,
                password: $scope.loginData.password
            };

            serverCallService.makePost(AppSettings.baseApiUrl + "rest/signin", user, success, error);
        };

        function success(data) {
            authenticatedUserService.setAuthenticatedUser(data);

            if (authenticatedUserService.isAuthenticated()) {
                $state.go('app.tournamentFeed');
            }
        }

        function error() {
            // An alert dialog
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed',
                template: 'Check your username, password and internet connection and try again.'
            });

            alertPopup.then(function (res) {
                $scope.isSubmitted = false;
            });
        }
    });
