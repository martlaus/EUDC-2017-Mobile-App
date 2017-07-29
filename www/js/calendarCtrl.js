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

    .controller('CalendarCtrl', function ($scope, $ionicLoading, $ionicScrollDelegate, $ionicSideMenuDelegate, $state, $timeout, $window, serverCallService) {

        var startHour = 6;
        var endHour = 23;
        var usehalfhour = false;

        if (!localStorage.loadedCalendarOnce) {
            localStorage.setItem("loadedCalendarOnce", "true");
            window.location.reload(true);
        }
        
        $scope.timerleft = '0px';
        $scope.timertop = '0px';

        $scope.hours = getHours();
        $scope.EUDCDays = getEUDCDays();
        $scope.days = getDays();

        loadEvents(true);

        function loadEvents(firstRun) {
            serverCallService.makeGet(AppSettings.baseApiUrl + "rest/event", {}, function (data) {
                populateEvents(data, firstRun);
            }, error);
        }

        function populateEvents(data, scroll) {
            var date1 = eeDate();
            $scope.events = [];

            for (var i = 0; i < data.length; i++) {
                if (eeDate(data[i].startTime).getDate() < 14 || eeDate(data[i].startTime).getDate() > 20) {
                    data.splice(i, 1);
                }
            }

            for (var i = 0; i < data.length; i++) {
                var day = eeDate(data[i].startTime).getDate();
                var start = eeDate(data[i].startTime);
                var durationMin = (eeDate(data[i].endTime) - start) / 1000 / 60;
                var duplicate = false;
                var eventColour = data[i].eventType.color;
                var eventIcon = data[i].eventType.eventIcon;

                var durLeft = durationMin / 60 - (24 - start.getHours());

                var j = 1;

                while (durLeft > 23) {
                    if (day + j < 21) {
                        duplicate = true;
                        $scope.events.push({
                            eventname: data[i].title,
                            starthour: eeDate(data[i].startTime).toTimeString().slice(0, 5),
                            endhour: eeDate(data[i].endTime).toTimeString().slice(0, 5),
                            left: String(60 + (day - 14 + j) * 120) + 'px',
                            day: day + j,
                            top: '0',
                            height: String(24 * 50) + 'px',
                            color: eventColour,
                            eventtype: eventIcon,
                            room: data[i].location,
                            dateformat: date1.toLocaleDateString(),
                            description: data[i].description
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

                var durationPx;
                if (durationMin / 60 + start.getHours() < 24) {
                    durationPx = durationMin / 60 * 50;
                } else {
                    durationPx = (24 - start.getHours()) * 50
                }

                $scope.events.push({
                    eventname: data[i].title,
                    starthour: eeDate(data[i].startTime).toTimeString().slice(0, 5),
                    endhour: eeDate(data[i].endTime).toTimeString().slice(0, 5),
                    left: String(60 + (day - 14) * 120) + 'px',
                    day: day,
                    top: String((start.getHours() - 6) * 50 + start.getMinutes() * 0.83) + 'px',
                    height: String(durationPx) + 'px',
                    color: eventColour,
                    eventtype: durationPx > 50 ? eventIcon : '',
                    room: data[i].location,
                    dateformat: date1.toLocaleDateString(),
                    description: data[i].description
                });

                if (duplicate && eeDate(data[i].endTime).getHours() !== 0 && eeDate(data[i].endTime).getDate() < 21) {
                    $scope.events.push({
                        eventname: data[i].title,
                        starthour: '00:00',
                        endhour: eeDate(data[i].endTime).toTimeString().slice(0, 5),
                        left: String(60 + (eeDate(data[i].endTime).getDate() - 14) * 120) + 'px',
                        day: eeDate(data[i].endTime).getDate(),
                        top: '0',
                        height: String(durLeft * 50) + 'px',
                        color: eventColour,
                        eventtype: eventIcon,
                        room: data[i].location,
                        dateformat: date1.toLocaleDateString(),
                        description: data[i].description
                    });
                }
            }

            if (scroll) {
                var scrollXPos;
                var weekday = eeDate().getDay();
                if (weekday) {
                    scrollXPos = 60 + (weekday - 1) * 120;
                } else {
                    scrollXPos = 60 + 6 * 120;
                }

                scrollXPos = scrollXPos - ($window.innerWidth / 2) + 60;
                var scrollYPos = eeDate().getHours() * 49.91 + eeDate().getMinutes() * 0.83;
                $ionicScrollDelegate.scrollTo(scrollXPos, scrollYPos);
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
                tmp.push({
                    id: i + 1,
                    name: 'August ' + (i + 14)
                });
            }

            return tmp;
        }

        function getDays() {
            var tmp = [];
            var date1 = eeDate();
            var date2 = eeDate();
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

        function reloadClock() {
            if (!$scope.$$phase) {
                $scope.$apply();
            }

            setTimeout(function () {
                reloadClock();
                loadEvents();
            }, 25000);
        }

        function eeDate(date) {
            return new Date(moment(date).utcOffset(moment().tz("Europe/Tallinn").utcOffset()).format('YYYY-MM-DDTHH:mm'));
        }

        function createMarkup(obj) {
            var keys = Object.keys(obj);
            if (!keys.length) return '';
            var i, len = keys.length;
            var result = '';

            for (i = 0; i < len; i++) {
                var key = keys[i];
                var val = obj[key];
                result += key + ':' + val + ';'
            }

            return result
        }

        $timeout(reloadClock());

        $scope.goToEventDetail = function (event) {
            const header = document.querySelector('.bar-header');

            if ($state.is('app.calendar')) {
                var eventColor = event.color;
                header.style.cssText = "background:" + eventColor + "!important";
            }

            $state.go('app.event', {
                'event': event
            });
        };

        $scope.gotScrolled = function () {
            $timeout(function () {
                $scope.timerleft = String($ionicScrollDelegate.getScrollPosition().left) + 'px';
                $scope.timertop = String(-$ionicScrollDelegate.getScrollPosition().top + 84) + 'px';
            });
        };

        $scope.clockYPosition = function () {
            return ((eeDate().getHours() - 6) * 49.91 + eeDate().getMinutes() * 0.83) + 'px';
        };

        $scope.clockXPosition = function () {
            var weekday = eeDate().getDay();
            if (weekday) {
                return (60 + (weekday - 1) * 120) + 'px';
            } else {
                return (60 + 6 * 120) + 'px';
            }
        };

        $scope.getGridHeaderStyles = function () {
            return createMarkup({
                'overflow': 'false',
                'width' : String(120 * $scope.EUDCDays.length + 60) + 'px',
                'left': '-' + $scope.timerleft
            });
        };

        $scope.getGridSessionsStyles = function () {
            return createMarkup({
                'height' : String(50 * $scope.hours.length) + 'px'
            });
        };

        $scope.getSessionsDayStyles = function () {
            return createMarkup({
                'overflow': 'true',
                'width' : String(120 * $scope.EUDCDays.length + 60) + 'px'
            });
        };

        $scope.getGridSessionCellStyles = function (event) {
            return createMarkup({
                'top': event.top,
                'left': event.left,
                'height': event.height,
                'background-color': event.color
            });
        };

        $scope.getGridTimesHolderStyles = function () {
            return createMarkup({
                'top': $scope.timertop
            });
        };

        $scope.$on('$ionicView.enter', function () {
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.$on('$ionicView.leave', function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
    });
