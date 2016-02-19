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
  return $resource("/customers/:id", {id: "@id", searchString: ""});
});
// RESTful demo app - Customer Cards
portfolioApp.directive('customerCardBrief', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardBrief.html',
    scope: {
      customers: "=",
    }
  }
});
portfolioApp.directive('customerCardFull', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardFull.html',
    scope: {
      customer: "=",      
    }
  }
});
// RESTful demo app - Modal Dialogue for Editing Customers
portfolioApp.directive('customerModalDialogue', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardModal.html',
    scope: {
      showModal: '='
    },
    link: function(scope, element, attrs){
      scope.hideModal = function() {
        scope.showModal = false;
      };
    }
  }
})

//################################
// CONTROLLERS
//################################
portfolioApp.controller('customerServicePortal', ['$scope', '$resource', 'CustomersAPI', function($scope, $resource, CustomersAPI){
  //INITIAL SETUP
  $scope.searchString = "";
  $scope.customers = CustomersAPI.query(function(){
    if($scope.customers[0]) $scope.currentCustomer = CustomersAPI.get( {id: $scope.customers[0]._id} );
  });

  // SET CURRENT CUSTOMER ID
  $scope.setCurrentCustomerId = function(id){
    console.log("setCurrentCustomerId triggered");
    $scope.currentCustomer = CustomersAPI.get( {id: id} );
  }
  // TYPEAHEAD SEARCH
  // Reduce total number of API calls by using setTimeout and clearTimeout
  var timeoutID;
  $scope.$watch('searchString', function(){
      if(timeoutID) clearTimeout(timeoutID);
      timeoutID = setTimeout(function(){
        $scope.customers = CustomersAPI.query({searchString: $scope.searchString}, function(){
          if($scope.customers[0])  $scope.currentCustomer = CustomersAPI.get( {id: $scope.customers[0]._id});
        })    
      }, 500);
  });
  // MODAL DIALOGUE TOGGLE
  $scope.showModal = false;
  $scope.toggleModal = function() {
    $scope.showModal = !$scope.showModal;
  };
}]);

