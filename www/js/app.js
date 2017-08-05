// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'timer', 'ngMessages', 'ngCordova', 'starter.controllers'])

    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');

    })

    .run(function ($ionicPlatform, $rootScope, authenticatedUserService, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            if (toState.name === 'login' && authenticatedUserService.isAuthenticated()) {
                $state.go('app.tournamentFeed');
            }
        });
    })
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Enable to debug issues.
            // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

            var notificationOpenedCallback = function (jsonData) {
                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
            };

            window.plugins.OneSignal
                .startInit("2396a245-b6d4-4c72-bba4-81f51a208714")
                .handleNotificationOpened(notificationOpenedCallback)
                .endInit();

            // Call syncHashedEmail anywhere in your app if you have the user's email.
            // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
            // window.plugins.OneSignal.syncHashedEmail(userEmail);
        });
    })

    .run(function ($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function () {
            // Enable to debug issues.
            // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

            var notificationOpenedCallback = function (jsonData) {
                console.log('notificationOpenedCallback received!');

                $ionicPopup.show({
                    template: jsonData.notification.payload.body,
                    title: jsonData.notification.payload.title,
                    buttons: [{
                        text: '<b>Close</b>',
                        type: 'button-positive',
                    }]
                });
            };

            window.plugins.OneSignal
                .startInit("2396a245-b6d4-4c72-bba4-81f51a208714")
                .handleNotificationOpened(notificationOpenedCallback)
                .endInit();

            // Call syncHashedEmail anywhere in your app if you have the user's email.
            // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
            // window.plugins.OneSignal.syncHashedEmail(userEmail);
        })
    })

    .run(['$rootScope', 'authenticatedUserService', '$location', function ($rootScope, authenticatedUserService, $location) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var values = next.split('#');
            const header = document.querySelector('.bar-header');

            if (!authenticatedUserService.isAuthenticated() && values[1] && values[1] !== "/login") {
                $location.path("/login");
            }

            if (values[1] !== ('/app/events/') && header) {
                header.style.cssText = '';
            }
        });
    }])

    .run(function ($ionicPlatform, $rootScope) {
        $rootScope.inBackground = false;
        $ionicPlatform.ready(function () {
            document.addEventListener("pause", function () {
                $rootScope.inBackground = true;
            });
            document.addEventListener("resume", function () {
                $rootScope.inBackground = false;
            });
        })
    })

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.tournamentFeed', {
                url: '/tournamentFeed',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tournamentFeed.html',
                        controller: 'TournamentFeedCtrl'
                    }
                }
            })

            .state('app.card', {
                url: '/cards/:id',
                params: {
                    'card': null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/card.html',
                        controller: 'CardCtrl'
                    }
                }
            })

            .state('app.maps', {
                url: '/maps',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/maps.html',
                        controller: 'MapsCtrl'
                    }
                }
            })
            .state('app.maps.tln', {
                url: '/tlnMap',
                views: {
                    'tln-tab': {
                        templateUrl: 'templates/tlnMap.html',
                        controller: 'tlnMapCtrl'
                    }
                }
            })
            .state('app.maps.tut', {
                url: "/tutMap",
                views: {
                    'tut-tab': {
                        templateUrl: "templates/tutMap.html",
                        controller: 'tutMapCtrl'
                    }
                }
            })

            .state('app.roundLocation', {
                url: '/roundLocation/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/roundLocation.html',
                        controller: 'roundLocationCtrl'
                    }
                }
            })

            .state('app.contacts', {
                url: '/contacts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contacts.html',
                        controller: 'contactsCtrl'
                    }
                }
            })

            .state('app.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/about.html',
                        controller: 'aboutCtrl'
                    }
                }
            })

            .state('app.calendar', {
                url: '/calendar',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/calendar.html',
                        controller: 'CalendarCtrl'
                    }
                }
            })

            .state('app.event', {
                url: '/events/:id',
                params: {
                    'event': null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/event.html',
                        controller: 'EventCtrl'
                    }
                }
            })

            .state('app.badgeView', {
                url: '/badgeView',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/badgeView.html',
                        controller: 'badgeViewCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
