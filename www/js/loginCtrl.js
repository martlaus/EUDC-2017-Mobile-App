angular.module('starter.controllers')
    .controller('LoginCtrl', function ($scope, $state) {

        $scope.loginData = {};

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            // TODO: API authentication here
            console.log('login  ' + $scope.loginData);
            var authenticated = true;
            if (authenticated) {
                $state.go('app.playlists');
            }
        };
    });
