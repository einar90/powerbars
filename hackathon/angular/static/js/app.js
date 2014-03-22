'use strict';


// Declare app level module which depends on filters, and services
angular.module('hackathon', [
	'ngRoute',
	'services',
	'controllers'
]).
config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/meter', {templateUrl: 'template/meter-list', controller: 'MeterListCtrl'});
	$routeProvider.when('/meter/:meterId', {templateUrl: 'template/meter-detail', controller: 'MeterDetailCtrl'});
	$routeProvider.otherwise({redirectTo: '/meter'});
}]).
config( function ($interpolateProvider) {
	$interpolateProvider.startSymbol('_[');
	$interpolateProvider.endSymbol(']_');
});