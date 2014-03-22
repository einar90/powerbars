$scope = {};

	$scope.getYearLinkID = function(year) {
		$scope.yearData = {};
		// For å få DL link til et år må vi gå til api/meter/meterID/year
		$.get('api/meter/0024ec929321472ca0d71e0ec739d090' + '/year/' + year).
			success( function (data) {
				//$scope.yearData[year] = data;
				if(!data.download) { return; }
				var downloadID = data.download.split('/')[3];
				console.log("DOwnload ID is:", downloadID);

				$scope.getYearData(year, downloadID)

			}).error(function(msg) {
				console.log("Failed", msg);
			});
	};

	$scope.calculateMonthlyNumbers = function(year) {
		if( $scope.yearData[year] && $scope.yearData[year] !== "") {
			var readings = $scope.yearData[year].meterReadings[0].meterReading.readings;
			console.log("Readings:", readings);
			for(var i = 0; i < readings.length - 1; i++) {
				var obj = readings[i];
				var obj1 = readings[i+1];
				var date = new Date(obj.timeStamp);
				$scope.yearData[year][date.getMonth()+1] = obj1.value - obj.value;
				console.log("Data:", $scope.yearData);
			}
		}
	};

	$scope.getYearData = function(year, year_downloadID) {
		// Downloads hentes fra ...
		$.get('api/download/' + year_downloadID, {
			}).
			success( function (data) {
				//$scope.yearData[year] = data;
				$scope.yearData[year] = data;
				console.log("YearData: ", $scope.yearData);
				console.log("Trying to getyeardata");
				$scope.calculateMonthlyNumbers(year);

				//
		});
	};

	$scope.initialize = function() {
		console.log("scope initialized");
		for(var i = 0; i < 5; i++) {
			console.log("RUnning", i);
			$scope.getYearLinkID(2014 - i);
		}
	};