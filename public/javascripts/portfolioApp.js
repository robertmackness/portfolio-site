var portfolioApp = angular.module('portfolioApp', ['ngRoute', 'ngResource']);

portfolioApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'assets/templates/template-main.html',
    })
    .when('/cv', {
      templateUrl: 'assets/templates/template-cv.html',
    })
    .when('/portfolio', {
      templateUrl: 'assets/templates/template-portfolio.html',
    })
});