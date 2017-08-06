angular.module('starter.controllers')

    .controller('MapsCtrl', function($scope, $state, $ionicSideMenuDelegate) {
        $ionicSideMenuDelegate.canDragContent(false);
    });
