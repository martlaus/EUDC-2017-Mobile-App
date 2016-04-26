angular.module('starter.controllers')

.controller('CardCtrl', function($scope, $state, $stateParams) {
    $scope.id = $stateParams.id;
    $scope.title = $stateParams.title;
});