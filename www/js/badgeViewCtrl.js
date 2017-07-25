angular.module('starter.controllers')

    .controller('badgeViewCtrl', function ($scope, $state, $ionicPopup, $ionicModal) {


        /*
         // Triggered on a button click, or some other target
         $scope.showPopup = function() {
         $scope.data = {};



         // An elaborate, custom popup
         var myPopup = $ionicPopup.show({
         template: '<input type="password" ng-model="data.wifi">',
         title: 'Enter Wi-Fi Password',
         subTitle: 'Please use normal things',
         scope: $scope,
         buttons: [
         { text: 'Cancel' },
         {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
         if (!$scope.data.wifi) {
         //don't allow the user to close unless he enters wifi password
         e.preventDefault();
         } else {
         return $scope.data.wifi;
         }
         }
         }
         ]
         });

         myPopup.then(function(res) {
         console.log('Tapped!', res);
         });

         $timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
         }, 3000);
         };

         // A confirm dialog
         $scope.showConfirm = function() {
         var confirmPopup = $ionicPopup.confirm({
         title: 'Consume Ice Cream',
         template: 'Are you sure you want to eat this ice cream?'
         });

         confirmPopup.then(function(res) {
         if(res) {
         console.log('You are sure');
         } else {
         console.log('You are not sure');
         }
         });
         };
         */


        // An alert dialog
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Badge thingie!',
                template: '<img src="http://static.boredpanda.com/blog/wp-content/uploads/2017/04/cute-dog-shiba-inu-ryuji-japan-12.jpg"/>'
            });

            alertPopup.then(function (res) {
                console.log('badge, yo');
            });
        };


        $scope.contacts = [
            {name: 'Gordon Freeman'},
            {name: 'Barney Calhoun'},
            {name: 'Lamarr the Headcrab'},
        ];

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.createContact = function (u) {
            $scope.contacts.push({name: u.firstName + ' ' + u.lastName});
            $scope.modal.hide();
        };


    });
