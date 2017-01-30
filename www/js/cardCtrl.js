angular.module('starter.controllers')

.controller('CardCtrl', function($scope, $state, $stateParams) {
    $scope.card = $stateParams.card;

    var logos = ["../img/TTU_alternatiivne_logo_EST_ENG_veeb.png", "../img/tutDebateClub.png", "../img/evs_eng.png"];

    showRandomLogo();

    function showRandomLogo() {

        var srcLogo = logos[(Math.floor(Math.random() * logos.length) + 0)];

        console.log(srcLogo);

        //$scope.someHTML = '<img id="footer-logo" src="../img/TTU_alternatiivne_logo_EST_ENG_veeb.png">';

        //<img id="footer-logo" src="../img/TTU_alternatiivne_logo_EST_ENG_veeb.png">
    }



});
