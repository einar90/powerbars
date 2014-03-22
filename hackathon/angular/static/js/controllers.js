'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('MeterListCtrl', ['$scope', '$http', function ($scope, $http) {
	//encoded = window.atob('0a88d7571c964d879e4d36609c3f08a4:95ff08db29b04b0598e192fc9d22bb00')

	$http.get('api', {
	}).
	success( function (data) {
		var meters = data.meters;
		// Cuts off the last element which is "Download"
		meters = meters.slice(0, -1);
		$scope.meters = meters;
	});
}]);

controllers.controller('MeterDetailCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	$http.get('api/meter/' + $routeParams.meterId, {
	}).
	success( function (data) {
		$scope.meter = data;
		$scope.meter.downloadId = data.download.split('/')[4];
	});
}]);

controllers.controller('MeterVisualiseCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	$http.get('api/download/' + $routeParams.downloadId, {
	}).
	success( function (data) {		
		$scope.Readings = data;
		console.log("Scope", $scope.Readings);

	});
}]);