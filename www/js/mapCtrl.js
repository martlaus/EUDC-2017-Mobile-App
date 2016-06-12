angular.module('starter.controllers')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, serverCallService) {

    var options = {
        timeout: 10000,
        enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
                    console.log(value.lat)
                    console.log(parseFloat(value.lat));

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

            var currentPosMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });

        });

    }, function(error) {
        console.log("Could not get location");
    });

});