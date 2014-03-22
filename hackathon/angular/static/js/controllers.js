'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('MeterListCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	//encoded = window.atob('0a88d7571c964d879e4d36609c3f08a4:95ff08db29b04b0598e192fc9d22bb00')
	var getRandomName = function() {
		var firstNames = ["Emil", "Einar", "Dzenan", "Simon", "Petter", "Bjarne", "Bjørnar", "Dag", "Jarl", "Harald"];
		var lastNames = ["Bull", "Berg", "Koffi", "Nordmann", "Stordalen", "Blåfjell", "Trying"];
		return (firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)]);
	}

	$scope.currentIndex = 0;
	$scope.lastIndex = 10;
	$scope.currentStep = 10;

	$scope.initializeGETCall = function() {
		$http.get('api' , {
		}).
		success( function (data) {
			console.log(data);
			var meters = data.meters;
			// Cuts off the last element which is "Download"
			meters = meters.slice(0, -1);
			for(var i = 0; i < meters.length; i++) {
				meters[i].name = getRandomName();
			}
			$scope.meters = meters;
			$scope.next = data.next;
		});
	};

	$scope.nextGETCall = function() {
		console.log("Trying the next get call");
		$scope.currentIndex += $scope.currentStep;
		$scope.lastIndex += $scope.currentStep;
		$http.get('api/start/' + $scope.currentIndex + '/stop/' + $scope.lastIndex + '/step/' + $scope.currentStep , {
		}).
		success( function (data) {
			console.log(data);
			var meters = data.meters;
			// Cuts off the last element which is "Download"
			meters = meters.slice(0, -1);
			$scope.meters = meters;
			$scope.next = data.next;
		});
	};

	$scope.prevGETCall = function() {
		console.log("Trying to get the previous call");
		if($scope.currentIndex - $scope.currentStep < 0) { return; }
		$scope.currentIndex -= $scope.currentStep;
		$scope.lastIndex -= $scope.currentStep;

		$http.get('api/start/' + $scope.currentIndex + '/stop/' + $scope.lastIndex + '/step/' + $scope.currentStep , {
		}).
		success( function (data) {
			console.log(data);
			var meters = data.meters;
			// Cuts off the last element which is "Download"
			meters = meters.slice(0, -1);
			$scope.meters = meters;
			$scope.next = data.next;
		});
	};

	$scope.initializeGETCall();
}]);

controllers.controller('MeterDetailCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	$http.get('api/meter/' + $routeParams.meterId, {
	}).
	success( function (data) {
		$scope.meter = data;
		$scope.meter.downloadId = data.download.split('/')[3];
	});
}]);

controllers.controller('MeterVisualiseCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	$http.get('api/download/' + $routeParams.downloadId, {
	}).
	success( function (data) {		
		$scope.Readings = data.meterReadings[0].meterReading.readings;
		var monthList = [];
		for(var i = 0; i < $scope.Readings.length; i++) {
			var obj = $scope.Readings[i];
			console.log("Reading:", obj);
			var date = new Date(obj.timeStamp);
			// Februar
			if(date.getMonth(1)) {
				var value = obj.value - $scope.Readings[i-1].value;
				monthList.push(value);
			}
			console.log(date);
		}
		console.log("MonthList:", monthList);
		console.log("Scope", $scope.Readings);

	});
}]);