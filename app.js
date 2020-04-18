// const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
//api.openweathermap.org/data/2.5/forecast?q=london&appid=8d666dc480691f6b1ddc912e88cf0ca5
// const key = '8d666dc480691f6b1ddc912e88cf0ca5';
// let city = '';

// MODULE
http: var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: 'pages/home.htm',
      controller: 'homeController',
    })

    .when('/forecast', {
      templateUrl: 'pages/forecast.htm',
      controller: 'forecastController',
    });
});

// SERVICES
weatherApp.service('cityService', function () {
  this.city = 'Bloomington';
});

// CONTROLLERS
weatherApp.controller('homeController', [
  '$scope',
  'cityService',
  function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
      cityService.city = $scope.city;
      console.log(cityService.city);
    });
  },
]);

weatherApp.controller('forecastController', [
  '$scope',
  '$resource',
  'cityService',
  function ($scope, $resource, cityService) {
    $scope.city = cityService.city;

    $scope.weatherAPI = $resource(
      'http://api.openweathermap.org/data/2.5/forecast/',
      { callback: 'JSON_CALLBACK' },
      { get: { method: 'JSONP' } }
    );

    $scope.weatherResult = $scope.weatherAPI.get({
      q: $scope.city,
      appid: '8d666dc480691f6b1ddc912e88cf0ca5',
    });
    console.log($scope.weatherResult);

    $scope.convertToFahrenheit = function (degK) {
      return Math.round(1.8 * (degK - 273) + 32);
    };

    $scope.convertToDate = function (dt) {
      return new Date(dt * 1000);
    };
  },
]);
