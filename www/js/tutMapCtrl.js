angular.module('starter.controllers')

    .controller('tutMapCtrl', function ($scope, $timeout, $ionicScrollDelegate, $state, $ionicSideMenuDelegate) {

        $ionicSideMenuDelegate.canDragContent(false);

        $timeout(function() {
            $ionicScrollDelegate.scrollTo(800, 0);
        });
    });