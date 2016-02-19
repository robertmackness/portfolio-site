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
      toggleModalEdit: '&',
      deleteCurrentCustomer: '&'      
    }
  }
});
// RESTful demo app - Modal Dialogue for Editing Customers
portfolioApp.directive('customerModalDialogueEdit', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardModalEdit.html',
    scope: {
      showModalEdit: '=',
      currentCustomer: '=',
      submitChanges: '&',
    },
    link: function(scope, element, attrs){
      scope.hideModal = function() {
        scope.showModalEdit = false;
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
          $scope.currentCustomer = CustomersAPI.get( {id: $scope.customers[0]._id});
        })    
      }, 500);
  });
  // MODAL DIALOGUES
  // Customer Edit - Toggle
  $scope.showModalEdit = false;
  $scope.toggleModalEdit = function() {
    $scope.showModalEdit = !$scope.showModalEdit;
  };
  // Customer Edit - Submit Changes
  $scope.submitChanges = function(id, customerObject){
    console.log("Submitted changes: ");
    console.log(id);
    console.log(customerObject);
  }
  // Customer Delete - Confirm
  $scope.showModalDelete = false;
  $scope.toggleModalDelete = function() {
    $scope.showModalDelete = !$scope.showModalDelete;
  };
  // Customer Delete - Confirmed 
  $scope.deleteCurrentCustomer = function(){
    console.log("Deleting current customer...");
    console.log($scope.currentCustomer);
  }
}]);

