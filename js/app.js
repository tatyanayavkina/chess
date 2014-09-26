'use strict';

var app = angular.module('staticchess', ['ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/board.html',
        controller: 'BoardCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);
