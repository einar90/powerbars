'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('MeterListCtrl', ['$scope', '$http', function ($scope, $http) {
	//encoded = window.atob('0a88d7571c964d879e4d36609c3f08a4:95ff08db29b04b0598e192fc9d22bb00')

	$http.get('api', {
	}).
	success( function (data) {
		console.log("JSON-DATA", data);
		$scope.meters = data.meters;
	});
}]);

controllers.controller('MeterDetailCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	$http.get('api/meter/' + $routeParams.meterId, {
	}).
	success( function (data) {
		console.log("JSON-DATA", data)
		$scope.meter = data;
	});
}]);