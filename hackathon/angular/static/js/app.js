'use strict';


// Declare app level module which depends on filters, and services
angular.module('hackathon', [
	'ngRoute',
	'services',
	'controllers'
]).
config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/meter', {templateUrl: 'partials/meter-list.html', controller: 'MeterListCtrl'});
	$routeProvider.otherwise({redirectTo: '/meter'});
}]);
// config(['$httpProvider', function ($httpProvider) {
// 	$httpProvider.default.headers.common['Authorization'] = 'Basic '
// }]);
