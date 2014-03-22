'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('services', []);
services.value('version', '0.1');

// services.factory('MeterReadings', ['$resource', 
// 	function ($resource) {
// 		return $resource('meter/:meterId', {}, {
// 			query: {method: 'GET', params: {}}
// 		});
// }]);

// phonecatServices.factory('Meter', ['$resource', 
// 	function($resource) {
// 		return $resource('api/meter/:meterID', {}, {
// 			query: {method: 'GET', params: {meterID: 'phones'}, isArray:true}
// 		});
// }]);

// services.factory('Weather', ['$resource', 
// 	function ($resource) {
// 		return $resource('http://api.yr.no/weatherapi/probabilityforecast/1.1/?lat=:lat;lon=:lon;msl=:msl.xml', {}, {
// 			query: {method: 'GET', params: {lat: 'latitude', lon: 'longditude', msl: 'msl'}, isArray:true}
// 		});
// }]);