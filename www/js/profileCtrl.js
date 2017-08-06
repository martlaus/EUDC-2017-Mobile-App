angular.module('starter.controllers')

    .controller('profileCtrl', function ($scope, $state, $ionicPopup, $http, serverCallService, authenticatedUserService, serverCallService) {

        $scope.user = authenticatedUserService.getUser();
        $scope.role = $scope.user.role.toLowerCase();
        $scope.barcode = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
        $scope.loading = false;

        $scope.logOut = function () {
            showLogoutAlert();
        };

        $scope.getLoadingClass = function () {
            if (!$scope.loading) {
                return '';
            } else {
                return 'loading';
            }
        };

        $scope.getBarcode = function () {
            if (!localStorage.barCode && !$scope.loading) {
                var tabbieId = JSON.parse(localStorage.authenticatedUser).user.tabbieId; // TODO change tournament id
                $scope.loading = true;

                serverCallService.makeGet(AppSettings.baseApiUrl + "rest/barcode/" + tabbieId, {}, function (data) {
                    $scope.barcode = 'data:image/png;base64, ' + data.b64;
                    localStorage.setItem('barCode', $scope.barcode);
                    $scope.loading = false;
                    $scope.getBarcode(); // Hacky thingie that gets over the angular scope updating problem that loading isn't set to false in the callback (if you know a better way, lemme know)
                }, error);
            } else if (!$scope.loading) {
                $scope.loading = false;
                $scope.barcode = localStorage.barCode;
            }

            return $scope.barcode;
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