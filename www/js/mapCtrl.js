angular.module('starter.controllers')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, serverCallService) {

    var options = {
        timeout: 10000,
        enableHighAccuracy: true
    };

    function initMap (position) {
        var positionLat = 59.395884;
        var positionLong = 24.6692423;

        var latLng = new google.maps.LatLng(positionLat, positionLong);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        google.maps.event.addListenerOnce($scope.map, 'idle', function() {
            var getLocationData = function() {
                var params = {};
                serverCallService.makeGet(AppSettings.baseApiUrl + "rest/location", params, success, error);
            };

            function success(data) {
                angular.forEach(data, function(value) {

                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        animation: google.maps.Animation.DROP,
                        position: {
                            lat: parseFloat(value.lat),
                            lng: parseFloat(value.lng)
                        }
                    });

                    var InfoWindow = new google.maps.InfoWindow({
                        content: value.name
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        InfoWindow.open($scope.map, marker);
                    });

                });
            }

            function error() {
                console.log('Error getting marker data');
            }

            getLocationData();

            if (typeof position !== 'undefined') {
                var yourLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: yourLatLng,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
            }
        });
    }

    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
        initMap(position);
    }, function(error) {
        console.log("Could not get location");
        initMap()
    });

});