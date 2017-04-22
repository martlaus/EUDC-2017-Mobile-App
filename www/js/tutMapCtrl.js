angular.module('starter.controllers')

    .controller('tutMapCtrl', function ($scope, $timeout, $ionicScrollDelegate, $state) {

        $timeout(function() {
        $ionicScrollDelegate.scrollTo(800, 0);
        });
    });