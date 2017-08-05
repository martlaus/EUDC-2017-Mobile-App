angular.module('starter.controllers')

    .controller('profileCtrl', function ($scope, $state, $ionicPopup, serverCallService, authenticatedUserService) {

        $scope.user = authenticatedUserService.getUser();
        console.log($scope.user);
        $scope.role = $scope.user.role.toLowerCase();

        $scope.logOut = function () {
            showLogoutAlert();
        };


        function showLogoutAlert() {

            var confirmLogoutPopup = $ionicPopup.confirm({
                title: 'Proceed with logout?'
            });

            confirmLogoutPopup.then(function (res) {
                if (res) {
                    serverCallService.makePost(AppSettings.baseApiUrl + "rest/signout", {}, success, error);
                    authenticatedUserService.removeAuthenticatedUser();
                } else {
                    $state.go('app.profile');
                }
            });
        }


        function success() {
            $state.go("login");
        }


        function error() {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed',
                template: 'Please try again.'
            });
        }
    });