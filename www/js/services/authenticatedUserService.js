angular.module('starter').factory('authenticatedUserService', ['$location',
    function ($location) {

        function getAuthenticatedUser() {
            return JSON.parse(localStorage.getItem("authenticatedUser"));
        }

        var instance = {
            setAuthenticatedUser: function (authenticatedUser) {
                localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
            },

            removeAuthenticatedUser: function () {
                localStorage.removeItem("authenticatedUser");
            },

            isAuthenticated: function () {
                if (getAuthenticatedUser()) {
                    return true;
                }

                return false;
            },

            getUser: function () {
                var authenticatedUser = getAuthenticatedUser();
                if (authenticatedUser) {
                    return authenticatedUser.user;
                }

                return null;
            },

            getToken: function () {
                var authenticatedUser = getAuthenticatedUser();
                if (authenticatedUser) {
                    return authenticatedUser.token;
                }

                return null;
            }
        };

        return instance;
    }
]);
