'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('MeterListCtrl', ['$scope', '$http', function ($scope, $http) {
	//encoded = window.atob('0a88d7571c964d879e4d36609c3f08a4:95ff08db29b04b0598e192fc9d22bb00')

	$http.get('https://api.demosteinkjer.no/downloads/190', {
		headers: {
			'Authentication': 'Basic 0a88d7571c964d879e4d36609c3f08a4:95ff08db29b04b0598e192fc9d22bb00',
		}
	}).
	success( function (data) {
		$scope.meters = data;
	}).
	always( function (data) {
		alert('Something happened!');
	});
}]);