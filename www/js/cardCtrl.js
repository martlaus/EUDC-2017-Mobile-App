angular.module('starter.controllers')

    .controller('CardCtrl', function ($scope, $state, $stateParams, $sce) {

        var logos = ["./img/TTU_alternatiivne_logo_EST_ENG_veeb.png", "./img/tutDebateClub.png", "./img/evs_eng.png"];

        showRandomLogo();
        showInfoOnCard();

        $scope.trustHtml = function (src) {
            return $sce.trustAsHtml(src);
        };

        function showRandomLogo() {
            var srcLogo = logos[(Math.floor(Math.random() * logos.length) + 0)];
            $scope.logoUrl = srcLogo;
        }

        function showInfoOnCard() {
            $scope.card = $stateParams.card;
        }

        function createVideoIframe(link) {

            var iframeHtml = '<div class="video-container">' +
                '<iframe src="' + link + '" frameborder="0" allowfullscreen></iframe>' +
                '</div>';

            return iframeHtml;
        }

        function createImgTag(link) {
            var imgHtml = '<div class="img-container"><img style="max-width: 100%" src="' + link + '" alt="image in' +
                ' text"/></div>';
            return imgHtml;
        }

        $scope.linkifyYouTubeURLs = function (text) {
            var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
            return text.replace(re, createVideoIframe('https://youtube.com/embed/$1'));
        }


        $scope. findImageLinks = function (text) {
            var re = /((http|https):\/\/[A-Za-z0-9\/\-.]*\/(\S+\.)(png|jpg|jpeg|svg|gif|tif|tiff|bmp))(\?.+)?/ig;
            return text.replace(re, createImgTag('$1'));
        }

    });
