angular.module('starter.controllers')
  .controller('CardCtrl', function ($scope, $ionicSwipeCardDelegate) {
    $scope.removeCard = function () {
      var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
      card.swipe();
    };
  })