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

    .controller('CalendarCtrl', function ($scope, $ionicLoading, $ionicScrollDelegate, $ionicSideMenuDelegate, $state, $timeout, $window, $rootScope, serverCallService) {

        var startHour = 6;
        var endHour = 23;
        var usehalfhour = false;
        var hourHeight = 67.5;
        var minuteHeight = 67.5 / 60;
        var dayWidth = 120;
        var overlappingEventWidth = 28;

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
            var spacer = [];
            var overlaps = [];
            for (var i = 0; i < 7; i++) {
                spacer[i] = [];
                overlaps[i] = [];
            }

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
                            left: String(60 + (day - 14 + j) * dayWidth) + 'px',
                            day: day + j,
                            top: '0',
                            height: String(24 * hourHeight) + 'px',
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
                var shortEvent = false;
                if (durationMin / 60 + start.getHours() < 24) {
                    durationPx = durationMin / 60 * hourHeight;
                } else {
                    durationPx = (24 - start.getHours()) * hourHeight
                }

                var newEvent = {
                    eventname: data[i].title,
                    starthour: eeDate(data[i].startTime).toTimeString().slice(0, 5),
                    endhour: eeDate(data[i].endTime).toTimeString().slice(0, 5),
                    left: String(60 + (day - 14) * dayWidth) + 'px',
                    day: day,
                    top: String((start.getHours() - 6) * hourHeight + start.getMinutes() * minuteHeight) + 'px',
                    height: String(durationPx) + 'px',
                    color: eventColour,
                    eventtype: durationPx > hourHeight ? eventIcon : '',
                    room: data[i].location,
                    dateformat: date1.toLocaleDateString(),
                    description: data[i].description,
                    shortEvent: durationPx < (hourHeight + 1)
                };

                for (j = 0; j < spacer[newEvent.day - 14].length; j++) {
                    if (!(
                            parseInt(newEvent.top) + parseInt(newEvent.height) < spacer[newEvent.day - 14][j][0] ||
                            parseInt(newEvent.top) > spacer[newEvent.day - 14][j][1]
                    )) {
                        newEvent.overlaps = true;
                        overlaps[newEvent.day - 14].push($scope.events.length);
                        break;
                    }
                }

                $scope.events.push(newEvent);

                spacer[day - 14].push([parseInt(newEvent.top), parseInt(newEvent.top) + parseInt(newEvent.height)]);

                if (duplicate && eeDate(data[i].endTime).getHours() !== 0 && eeDate(data[i].endTime).getDate() < 21) {
                    $scope.events.push({
                        eventname: data[i].title,
                        starthour: '00:00',
                        endhour: eeDate(data[i].endTime).toTimeString().slice(0, 5),
                        left: String(60 + (eeDate(data[i].endTime).getDate() - 14) * dayWidth) + 'px',
                        day: eeDate(data[i].endTime).getDate(),
                        top: '0',
                        height: String(durLeft * hourHeight) + 'px',
                        color: eventColour,
                        eventtype: eventIcon,
                        room: data[i].location,
                        dateformat: date1.toLocaleDateString(),
                        description: data[i].description,
                        shortEvent: durLeft < 1
                    });
                }
            }

            for (var d in overlaps) {
                for (var e in overlaps[d]) {
                    for (var e2 in overlaps[d]) {
                        if (!(
                            parseInt($scope.events[overlaps[d][e]].top) + parseInt($scope.events[overlaps[d][e]].height) < parseInt($scope.events[overlaps[d][e2]].top) ||
                            parseInt($scope.events[overlaps[d][e]].top) > parseInt($scope.events[overlaps[d][e2]].top) + parseInt($scope.events[overlaps[d][e2]].height)
                        )) {
                            $scope.events[overlaps[d][e]].doubleOverlaps = true;
                        }
                    }
                }
            }

            var toggle = false;
            for (e in $scope.events) {
                if ($scope.events[e].overlaps && toggle) {
                    $scope.events[e].left = (parseInt($scope.events[e].left) + overlappingEventWidth) + 'px';
                    $scope.events[e].rightSider = true;
                }

                toggle = !toggle;
            }

            if (scroll) {
                var scrollXPos;
                var weekday = eeDate().getDay();
                if (weekday) {
                    scrollXPos = 60 + (weekday - 1) * dayWidth;
                } else {
                    scrollXPos = 60 + 6 * dayWidth;
                }

                scrollXPos = scrollXPos - ($window.innerWidth / 2) + 60;
                var scrollYPos = eeDate().getHours() * 49.91 + eeDate().getMinutes() * minuteHeight;
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
                if (!$rootScope.inBackground) {
                    // loadEvents();
                }
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

        $scope.handleEmptyClick = function ($event) {
            if ($event.target.className === 'grid-sessions-day') {
                $scope.closeShortEvents();
            }
        };

        $scope.goToEventDetail = function (event) {
            if ((event.shortEvent || event.overlaps) && !event.opened) {
                $scope.closeShortEvents();
                event.opened = true;

                if (event.overlaps && event.rightSider) {
                    event.left = (parseInt(event.left) - overlappingEventWidth) + 'px';
                }
                return;
            }

            const header = document.querySelector('.bar-header');

            if ($state.is('app.calendar')) {
                var eventColor = event.color;
                header.style.cssText = "background:" + eventColor + "!important";
            }

            $state.go('app.event', {
                'event': event
            });
        };

        $scope.closeShortEvents = function () {
            for (var event in $scope.events) {
                if ($scope.events[event].overlaps && $scope.events[event].opened && $scope.events[event].rightSider) {
                    $scope.events[event].left = (parseInt($scope.events[event].left) + overlappingEventWidth) + 'px';
                }

                $scope.events[event].opened = false;
            }
        };

        $scope.gotScrolled = function () {
            $timeout(function () {
                $scope.timerleft = String($ionicScrollDelegate.getScrollPosition().left) + 'px';
                $scope.timertop = String(-$ionicScrollDelegate.getScrollPosition().top + 84) + 'px';
            });
        };

        $scope.clockYPosition = function () {
            return ((eeDate().getHours() - 6) * hourHeight + eeDate().getMinutes() * minuteHeight) + 'px';
        };

        $scope.clockXPosition = function () {
            var weekday = eeDate().getDay();
            if (weekday) {
                return (60 + (weekday - 1) * dayWidth) + 'px';
            } else {
                return (60 + 6 * dayWidth) + 'px';
            }
        };

        $scope.getGridHeaderStyles = function () {
            return createMarkup({
                // 'overflow': 'false',
                'width' : String(dayWidth * $scope.EUDCDays.length + 60) + 'px',
                'left': '-' + $scope.timerleft
            });
        };

        $scope.getGridSessionsStyles = function () {
            return createMarkup({
                'height' : String(hourHeight * $scope.hours.length) + 'px'
            });
        };

        $scope.getSessionsDayStyles = function () {
            return createMarkup({
                // 'overflow': 'true',
                'width' : String(dayWidth * $scope.EUDCDays.length + 60) + 'px'
            });
        };

        $scope.getGridSessionCellStyles = function (event) {
            var obj = {
                'top': event.top,
                'left': event.left,
                'background-color': event.color
            };

            if (!event.shortEvent) {
                obj['height'] = event.height;
            } else {
                obj['max-height'] = event.height;
            }

            return createMarkup(obj);
        };

        $scope.getGridCellClasses = function (event) {
            var classes = '';

            if (event.shortEvent || event.overlaps) {
                if (!event.opened) {
                    classes += ' wrapped';
                } else {
                    classes += ' opened';
                }
            }

            if (event.shortEvent) {
                classes += ' short';

                if (!event.inAnimation) {
                    classes += ' ellipsed';
                }
            }

            if (event.overlaps) {
                classes += ' overlapping';
            }

            return classes;
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
