angular.module('starter.controllers')

    .controller('CardCtrl', function ($scope, $state, $stateParams, $sce, $filter) {
        var regex = {
            youtube: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig,
            img: /((http|https):\/\/[A-Za-z0-9\/\-.]*\/(\S+\.)(png|jpg|jpeg|svg|gif|tif|tiff|bmp))(\?.+)?/ig,
            href: /(^|[^<>"])\b((?:https?):\/\/[^<>\s]+\b)/ig
        }

        var logos = ["./img/TTU_alternatiivne_logo_EST_ENG_veeb.png", "./img/tutDebateClub.png", "./img/evs_eng.png"];

        showRandomLogo();
        showInfoOnCard();

        function showRandomLogo() {
            var srcLogo = logos[(Math.floor(Math.random() * logos.length) + 0)];
            $scope.logoUrl = srcLogo;
        }

        function showInfoOnCard() {
            if ($stateParams.card) {
                $scope.card = $stateParams.card;
            } else {
                $state.go('app.tournamentFeed');
            }
        }

        function createVideoIframe(link) {
            return '<div class="video-container"><iframe src="' + link + '" frameborder="0" allowfullscreen></iframe></div>';
        }

        function createImgTag(link) {
            return '<div class="img-container"><img style="max-width: 100%" src="' + link + '" alt="image in text"/></div>';
        }

        function createHrefTag(before, link) {
            return before + '<a href="#" onclick="window.open(\'' + link + '\', \'_system\', \'location=yes\');">' + link + '</a>';
        }

        $scope.parseText = function (text) {
            if (!text) return;
            text = text.replace(regex.youtube, createVideoIframe('https://youtube.com/embed/$1'));
            text = text.replace(regex.img, createImgTag('$1'));
            text = text.replace(regex.href, createHrefTag('$1', '$2'));

            return $sce.trustAsHtml(text);
        }
    });
