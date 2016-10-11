// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'timer', 'ngMessages', 'ngCordova', 'starter.controllers'])

    .run(function ($ionicPlatform) {
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
    })

    .run(['$rootScope', 'authenticatedUserService', '$location', function ($rootScope, authenticatedUserService, $location) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var values = next.split('#');
            if (!authenticatedUserService.isAuthenticated() && values[1] && values[1] !== "/login") {
                $location.path("/login");
            }
        });
    }])


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

            .state('app.map', {
                url: '/map',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/map.html',
                        controller: 'MapCtrl'
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
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });