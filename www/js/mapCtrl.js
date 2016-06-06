angular.module('starter.controllers')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {

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

            var currentPosMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng, 
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
            
            var piritaSpaMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.464808, lng: 24.823108}
            });
            
            var songFestivalGroundsMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.444686, lng: 24.807330}
            });
            
            var airportMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.416500, lng: 24.799281}
            });
            
            var busStationMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.427567, lng: 24.773679}
            });
            
            var nordeaMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.433227, lng: 24.751926}
            });
            
            var harbourMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.443634, lng: 24.767353}
            });
            
            var kultuurikatelMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.444416, lng: 24.750546}
            });
            
            var telliskiviMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.440103, lng: 24.729530}
            });
            
            var tutMarker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: {lat: 59.395916, lng: 24.671871}
            });
                       
            var currentPosInfoWindow = new google.maps.InfoWindow({
                content: "Your current location"
            });
            
            var piritaSpaInfoWindow = new google.maps.InfoWindow({
                content: "Pirita SPA Hotel"
            });
            
            var songFestivalGroundsInfoWindow = new google.maps.InfoWindow({
                content: "Tallinn Song Festival Grounds"
            });
            
            var airportInfoWindow = new google.maps.InfoWindow({
                content: "Tallinn Airport"
            });
            
            var busStationInfoWindow = new google.maps.InfoWindow({
                content: "Tallinn Bus Station"
            });
            
            var harbourInfoWindow = new google.maps.InfoWindow({
                content: "Tallinn harbour"
            });
            
            var kultuurikatelInfoWindow = new google.maps.InfoWindow({
                content: "Kultuurikatel"
            });
            
            var nordeaInfoWindow = new google.maps.InfoWindow({
                content: "Nordea Concert Hall"
            });
            
            var telliskiviInfoWindow = new google.maps.InfoWindow({
                content: "Telliskivi Creative City"
            });
            
            var tutInfoWindow = new google.maps.InfoWindow({
                content: "Tallinn University of Technology"
            });

            google.maps.event.addListener(currentPosMarker, 'click', function() {
                currentPosInfoWindow.open($scope.map, currentPosMarker);
            });
            
            google.maps.event.addListener(piritaSpaMarker, 'click', function() {
                piritaSpaInfoWindow.open($scope.map, piritaSpaMarker);
            });
            
            google.maps.event.addListener(songFestivalGroundsMarker, 'click', function() {
                songFestivalGroundsInfoWindow.open($scope.map, songFestivalGroundsMarker);
            });
            
            google.maps.event.addListener(airportMarker, 'click', function() {
                airportInfoWindow.open($scope.map, airportMarker);
            });
            
            google.maps.event.addListener(busStationMarker, 'click', function() {
                busStationInfoWindow.open($scope.map, busStationMarker);
            });
            
            google.maps.event.addListener(nordeaMarker, 'click', function() {
                nordeaInfoWindow.open($scope.map, nordeaMarker);
            });
            
            google.maps.event.addListener(harbourMarker, 'click', function() {
                harbourInfoWindow.open($scope.map, harbourMarker);
            });
            
            google.maps.event.addListener(kultuurikatelMarker, 'click', function() {
                kultuurikatelInfoWindow.open($scope.map, kultuurikatelMarker);
            });
            
            google.maps.event.addListener(telliskiviMarker, 'click', function() {
                telliskiviInfoWindow.open($scope.map, telliskiviMarker);
            });
            
            google.maps.event.addListener(tutMarker, 'click', function() {
                tutInfoWindow.open($scope.map, tutMarker);
            });           

        });

    }, function(error) {
        console.log("Could not get location");
    });

});