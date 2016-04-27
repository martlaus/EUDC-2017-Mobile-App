angular.module('starter.controllers')

.controller('CardCtrl', function($scope, $state, $stateParams) {
    $scope.card = $stateParams.card;
});