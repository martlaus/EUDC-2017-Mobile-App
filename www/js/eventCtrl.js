angular.module('starter.controllers')

.controller('EventCtrl', function($scope, $state, $stateParams) {
    $scope.event = $stateParams.event;

    var logos = ["../img/TTU_alternatiivne_logo_EST_ENG_veeb.png", "../img/tutDebateClub.png", "../img/evs_eng.png"];
    showRandomLogo();

    function showRandomLogo() {
        var srcLogo = logos[(Math.floor(Math.random() * logos.length) + 0)];
        $scope.logoUrl = srcLogo;
    }

});
