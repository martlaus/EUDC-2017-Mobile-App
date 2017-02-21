angular.module('starter.controllers')

    .controller('CardCtrl', function ($scope, $state, $stateParams, $sce) {

        var logos = ["./img/TTU_alternatiivne_logo_EST_ENG_veeb.png", "./img/tutDebateClub.png", "./img/evs_eng.png"];


        showRandomLogo();
        showInfoOnCard();

        $scope.trustHtml = function(src) {
            return $sce.trustAsHtml(src);
        }

        function showRandomLogo() {
            var srcLogo = logos[(Math.floor(Math.random() * logos.length) + 0)];
            $scope.logoUrl = srcLogo;
        }

        function showInfoOnCard() {

            var id = findVideoId();

            $scope.card = $stateParams.card;
        }

        function findVideoId() {
            var description = $stateParams.card.description;

            var id = '';
            var url = description.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

            if (url[2] !== undefined) {
                id = url[2].split(/[^0-9a-z_\-]/i);
                id = id[0];
            }
            return id;
        }

        function createVideoIframe(link) {

            var iframeHtml = '<div class="video-container">' +
                '<iframe src="' + link + '" frameborder="0" allowfullscreen></iframe>' +
                '</div>';

            return iframeHtml;
        }

        $scope.linkifyYouTubeURLs = function(text){
            var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
            return text.replace(re, createVideoIframe('https://youtube.com/embed/$1'));
        }

    });
