angular.module('starter.controllers')

    .controller('profileCtrl', function ($scope, $state, $ionicPopup, $http, serverCallService, authenticatedUserService, serverCallService) {

        $scope.user = authenticatedUserService.getUser();
        $scope.role = $scope.user.role.toLowerCase();
        $scope.barcode = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
        $scope.loading = true;
        getBarcode();

        $scope.logOut = function () {
            showLogoutAlert();
        };

        function getBarcode() {
            var item = localStorage.getItem("barCode");
            if (!item) {
                var user = authenticatedUserService.getUser();

                serverCallService.makeGet(AppSettings.baseApiUrl + "rest/barcode/" + user.tabbieId, {}, function (data) {
                    if (data.b64) {
                        $scope.barcodeImg = 'data:image/png;base64, ' + data.b64;
                        localStorage.setItem('barCode', $scope.barcodeImg);
                        $scope.getBarcode(); // Hacky thingie that gets over the angular scope updating problem that loading isn't set to false in the callback (if you know a better way, lemme know)
                    }
                    $scope.loading = false;
                }, error);
            } else if (!$scope.loading) {
                $scope.loading = false;
                $scope.barcodeImg = item;
            }
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
            window.location.reload();
        }

        function error() {
            $scope.loading = false;

            var alertPopup = $ionicPopup.alert({
                title: 'Login failed',
                template: 'Please try again.'
            });
        }
    });