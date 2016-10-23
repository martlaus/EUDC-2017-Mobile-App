angular.module('starter.controllers')

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .controller('CalendarCtrl', function ($scope, $ionicScrollDelegate, $ionicSideMenuDelegate) {

        var startHour = 0;
        var endHour = 23;
        var usehalfhour = false;

        $scope.timerleft = '0px';

        $scope.hours = getHours();
        $scope.EUDCDays = getEUDCDays();
        $scope.days = getDays();
        $scope.events = getEvents();

        function getHours() {
            var tmp = [];
            for (var i = startHour; i <= endHour; i++) {
                tmp.push(('0' + i).slice(-2) + ':00');
                if (usehalfhour && i < endHour) {
                    tmp.push(('0' + i).slice(-2) + ':30');
                }
            }

            return tmp;
        }

        function getEUDCDays() {
            var tmp = [];
            for (i = 0; i < 7; i++) {
                tmp.push({id: i + 1, name: `August ${i + 14}`});
            }

            return tmp;
        }
        function getDays() {
            var tmp = [];
            var date1 = new Date();
            var date2 = new Date();
            date2.setDate(date2.getDate() + 1);
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            var monthname = new Array(12);
            monthname[0] = "January";
            monthname[1] = "February";
            monthname[2] = "March";
            monthname[3] = "April";
            monthname[4] = "May";
            monthname[5] = "June";
            monthname[6] = "July";
            monthname[7] = "August";
            monthname[8] = "September";
            monthname[9] = "October";
            monthname[10] = "November";
            monthname[11] = "December";


            tmp.push({
                day: '',
                longdate: '',
                datevalue: date1,
                dateformat: date1.toLocaleDateString()
            });
            console.log(tmp);
            return tmp;
        }

        $scope.gotScrolled = function () {

            $scope.timerleft = $ionicScrollDelegate.getScrollPosition().left + 'px';
            $scope.$apply();

        };

        function getEvents() {
            var tmp = [];
            var date1 = new Date();
            tmp.push({
                eventname: 'Presentation 1',
                starthour: '08:00',
                endhour: '09:30',
                eventtype: 'ion-mic-c',
                room: 'TUT Debate virtual world',
                left: (60 + 0 * 120) + 'px',
                top: (1 * 100) + 'px',
                height: (1.5 * 100) + 'px',
                color: 'rgba(0,157,151,0.75)',
                dateformat: date1.toLocaleDateString()
            });
            tmp.push({
                eventname: 'Coffee Break',
                starthour: '09:30',
                endhour: '10:00',
                eventtype: 'ion-coffee',
                room: 'TUT Debate virtual world',
                left: (60 + 0 * 120) + 'px',
                top: (2.5 * 100) + 'px',
                height: (0.5 * 100) + 'px',
                color: 'rgba(255,169,0,0.75)',
                dateformat: date1.toLocaleDateString()
            });
            // tmp.push({
            //     eventname: 'Presentation 2',
            //     starthour: '10:00',
            //     endhour: '11:45',
            //     eventtype: 'ion-mic-c',
            //     room: 'Morpheus',
            //     left: (60 + 0 * 120) + 'px',
            //     top: (23 + 3 * 100) + 'px',
            //     height: (1.75 * 100) + 'px',
            //     color: 'rgba(0,157,151,0.75)',
            //     dateformat: date1.toLocaleDateString()
            // });
            // tmp.push({
            //     eventname: 'Networking + Coffee',
            //     starthour: '12:00',
            //     endhour: '14:00',
            //     eventtype: 'ion-chatbubbles',
            //     room: 'Morpheus',
            //     left: (60 + 0 * 120) + 'px',
            //     top: (23 + 5 * 100) + 'px',
            //     height: (1.75 * 100) + 'px',
            //     color: 'rgba(18,67,172,0.75)',
            //     dateformat: date1.toLocaleDateString()
            // });
            // tmp.push({
            //     eventname: 'Presentation 3',
            //     starthour: '14:30',
            //     endhour: '18:00',
            //     eventtype: 'ion-mic-c',
            //     room: 'Morpheus',
            //     left: (60 + 0 * 120) + 'px',
            //     top: (23 + 7.5 * 100) + 'px',
            //     height: (2.5 * 100) + 'px',
            //     color: 'rgba(0,157,151,0.75)',
            //     dateformat: date1.toLocaleDateString()
            // });
            // tmp.push({
            //     eventname: 'Dinner',
            //     starthour: '19:00',
            //     endhour: '21:00',
            //     eventtype: 'ion-wineglass',
            //     room: 'Morpheus',
            //     left: (60 + 0 * 120) + 'px',
            //     top: (23 + 12 * 100) + 'px',
            //     height: (2 * 100) + 'px',
            //     color: 'rgba(255,113,0,0.75)',
            //     dateformat: date1.toLocaleDateString()
            // });
            //
            // tmp.push({
            //     eventname: 'Presentation 4',
            //     starthour: '08:00',
            //     endhour: '11:00',
            //     eventtype: 'ion-mic-c',
            //     room: 'Trinity',
            //     left: (60 + 2 * 120) + 'px',
            //     top: (23 + 1 * 100) + 'px',
            //     height: (3 * 100) + 'px',
            //     color: 'rgba(0,157,151,0.75)',
            //     dateformat: date1.toLocaleDateString()
            // });
            // tmp.push({
            //     eventname: 'Presentation 5',
            //     starthour: '11:00',
            //     endhour: '12:00',
            //     eventtype: 'ion-mic-c',
            //     room: 'Trinity',
            //     left: (60 + 2 * 120) + 'px',
            //     top: (23 + 4 * 100) + 'px',
            //     height: (1 * 100) + 'px',
            //     color: 'rgba(0,157,151,0.75)',
            //     dateformat: date1.toLocaleDateString()
            // });
            // tmp.push({
            //     eventname: 'Networking + Coffee',
            //     starthour: '12:00',
            //     endhour: '14:00',
            //     eventtype: 'ion-chatbubbles',
            //     room: 'Trinity',
            //     left: (60 + 2 * 120) + 'px',
            //     top: (23 + 5 * 100) + 'px',
            //     height: (1.75 * 100) + 'px',
            //     color: 'rgba(18,67,172,0.75)',
            //     dateformat: date1.toLocaleDateString()
            // });
            // tmp.push({
            //     eventname: 'Presentation 6',
            //     starthour: '14:30',
            //     endhour: '16:00',
            //     eventtype: 'ion-mic-c',
            //     room: 'Trinity',
            //     left: (60 + 2 * 120) + 'px',
            //     top: (23 + 7.5 * 100) + 'px',
            //     height: (1.5 * 100) + 'px',
            //     color: 'rgba(0,157,151,0.75)',
            //     dateformat: date1.toLocaleDateString()
            // });
            //
            //
            //Presentation - 0,157,151 -- ion-mic-c
            //Networking 18,67,172 -- ion-chatbubbles
            //Coffee Break 255,169,0, --ion-coffee
            //Dinner 255,113,0 --ion-wineglass
            return tmp;
        }

        $scope.$on('$ionicView.enter', function(){
          $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.$on('$ionicView.leave', function(){
          $ionicSideMenuDelegate.canDragContent(true);
        });

    });
