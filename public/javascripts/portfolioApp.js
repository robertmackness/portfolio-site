//################################
// MODULE
//################################
var portfolioApp = angular.module('portfolioApp', ['ngRoute', 'ngResource']);

//################################
// ROUTES
//################################
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
    .when('/portfolio/customerserviceportal', {
      templateUrl: 'assets/templates/template-portfolio-customer-service-portfolio.html',
    })
});

//################################
// FACTORIES AND CUSTOM DIRECTIVES
//################################
// RESTful demo app - Customer API consumption
portfolioApp.factory("CustomersAPI", function($resource) {
  return $resource("/customers/:id", {},
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );
});
// RESTful demo app - Customer Cards
portfolioApp.directive('customerCardBrief', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardBrief.html',
    scope: {
      customers: "="
    }
  }
});
portfolioApp.directive('customerCardFull', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardFull.html',
    scope: {
      customer: "="
    }
  }
});

//################################
// CONTROLLERS
//################################
portfolioApp.controller('customerServicePortal', ['$scope', '$resource', 'CustomersAPI', function($scope, $resource, CustomersAPI){

  $scope.customers = CustomersAPI.index();
  $scope.currentCustomer = $scope.customers[0];
  console.log($scope.customers);
}]);

