angular.module('starter.controllers')

    .controller('DetailViewCtrl', function ($scope, $stateParams) {

        $scope.logo = '<img id="footer-logo" src="../img/TTU_alternatiivne_logo_EST_ENG_veeb.png">';

        //var logos = ["../img/TTU_alternatiivne_logo_EST_ENG_veeb.png", "../img/tutDebateClub.png", "../img/evs_eng.png"];

        //showRandomLogo();

        /*
        function showRandomLogo() {

            var srcLogo = logos[(Math.floor(Math.random() * logos.length) + 0)];

            var div = document.getElementById('#footer-logo-div');
            div.innerHTML = srcLogo;

            //$scope.someHTML = '<img id="footer-logo" src="../img/TTU_alternatiivne_logo_EST_ENG_veeb.png">';

            //<img id="footer-logo" src="../img/TTU_alternatiivne_logo_EST_ENG_veeb.png">
        }

        */

    })



    //var srcLogo = logos[(Math.floor(Math.random() * logos.length) + 0)];

    //var div = document.getElementById('#footerLogoDiv');
    //div.innerHTML = srcLogo;

    //$('#footerLogoDiv').prepend('<img id="footer-logo" src="' + srcLogo + '" />')
