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

    .controller('CalendarCtrl', function ($scope, $ionicScrollDelegate, $ionicSideMenuDelegate, serverCallService) {

        var startHour = 0;
        var endHour = 23;
        var usehalfhour = false;

        $scope.timerleft = '0px';

        $scope.hours = getHours();
        $scope.EUDCDays = getEUDCDays();
        $scope.days = getDays();
        loadEvents();

        function loadEvents() {
            serverCallService.makeGet(AppSettings.baseApiUrl + "rest/event", {}, populateEvents, error)
        }

        function populateEvents(data) {
            var date1 = new Date();
            $scope.events = [];

            for (var i = 0; i < data.length; i++) {
                if (new Date(data[i].startTime).getDate() < 14 || new Date(data[i].startTime).getDate() > 20) {
                    data.splice(i, 1);
                }
            }
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var day = new Date(data[i].startTime).getDate();
                var start = new Date(data[i].startTime);
                var durationMin = (new Date(data[i].endTime) - start) / 1000 / 60;
                var duplicate = false;
                var eventColour = '#';
                for (j = 0; j < 3; j++) {
                    var random = Math.floor(Math.random()*205).toString(16);
                    if (random.length < 2) {
                        random = '0' + random;
                    }
                    eventColour += random;
                }

                var durLeft = durationMin / 60 - (24 - start.getHours());

                if (data[i].id == 1) {
                    console.log('start', start.getHours());
                    console.log('duration', durationMin / 60);
                    console.log(durLeft);
                }


                var j = 1;

                while (durLeft > 23) {
                    if (day + j < 21) {
                        duplicate = true;
                        $scope.events.push({
                            eventname: data[i].title,
                            starthour: new Date(data[i].startTime).toTimeString().slice(0, 5),
                            endhour: new Date(data[i].endTime).toTimeString().slice(0, 5),
                            left: (60 + (day - 14 + j) * 120) + 'px',
                            top: 0,
                            height: 24 * 50 + 'px',
                            // color: 'orange',
                            color: eventColour,
                            eventtype: 'ion-mic-c',
                            room: 'TUT Debate virtual world',
                            dateformat: date1.toLocaleDateString()
                        });
                    }
                    j++;
                    durLeft -= 24;
                }

                if (start.getHours() + durationMin / 60 > 24) {
                    var fullDuration = durationMin;
                    var leftDuration;

                    duplicate = true;
                    durationMin = (24 - start.getHours()) * 60;

                    leftDuration = fullDuration - durationMin;
                }

                $scope.events.push({
                    eventname: data[i].title,
                    starthour: new Date(data[i].startTime).toTimeString().slice(0, 5),
                    endhour: new Date(data[i].endTime).toTimeString().slice(0, 5),
                    left: (60 + (day - 14) * 120) + 'px',
                    top: start.getHours() * 50 + 'px',
                    height: durationMin / 60 + start.getHours() < 24 ? durationMin / 60 * 50 + 'px' : (24 - start.getHours()) * 50 + 'px',
                    // color: 'orange',
                    color: eventColour,
                    eventtype: 'ion-mic-c',
                    room: 'TUT Debate virtual world',
                    dateformat: date1.toLocaleDateString()
                });

                if (duplicate && new Date(data[i].endTime).getHours() !== 0 && new Date(data[i].endTime).getDate() < 21) {
                    console.log(durLeft);
                    $scope.events.push({
                        eventname: data[i].title,
                        starthour: '00:00',
                        endhour: new Date(data[i].endTime).toTimeString().slice(0, 5),
                        left: (60 + (new Date(data[i].endTime).getDate() - 14) * 120) + 'px',
                        top: '0',
                        height: durLeft * 50 + 'px',
                        // color: 'orange',
                        color: eventColour,
                        eventtype: 'ion-mic-c',
                        room: 'TUT Debate virtual world',
                        dateformat: date1.toLocaleDateString()
                    });
                }
            }
        }

        function error() {
            console.log("Failed to get event list from server")
        }

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
            return tmp;
        }

        $scope.gotScrolled = function () {

            $scope.timerleft = $ionicScrollDelegate.getScrollPosition().left + 'px';
            $scope.$apply();

        };

        $scope.$on('$ionicView.enter', function(){
          $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.$on('$ionicView.leave', function(){
          $ionicSideMenuDelegate.canDragContent(true);
        });

    });
