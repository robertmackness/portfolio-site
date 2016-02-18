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
// FACTORIES
//################################
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

//################################
// CONTROLLERS
//################################
portfolioApp.controller('customerServicePortal', ['$scope', '$resource', 'CustomersAPI', function($scope, $resource, CustomersAPI){

  $scope.customers = CustomersAPI.index();
  console.log($scope.customers);

}]);

