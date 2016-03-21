//################################
// MODULE
//################################
var portfolioApp = angular.module('portfolioApp', ['ngRoute', 'ngResource']);

//################################
// ROUTES
//################################
portfolioApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'assets/templates/template-main.html',
    })
    .when('/portfolio', {
      templateUrl: 'assets/templates/template-portfolio.html',
    })
    .when('/portfolio/customerserviceportal', {
      templateUrl: 'assets/templates/template-portfolio-customer-service-portal.html',
    });
}]);

//################################
// FACTORIES AND CUSTOM DIRECTIVES
//################################
// RESTful demo app - Customer API consumption
portfolioApp.factory('CustomersAPI',['$resource', function($resource) {
  return $resource("/customersAPI/:id", {id: "@id"}, {
      edit:  {method:'PUT', params: {id: "id"}},
  });
}]);
// RESTful demo app - Customer Cards
portfolioApp.directive('customerCardBrief', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardBrief.html',
    scope: {
      customers: "=",
    }
  };
});
portfolioApp.directive('customerCardFull', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardFull.html',
    scope: {
      customer: "=",
      toggleModalEdit: '&',
      toggleModalDelete: '&'      
    }
  };
});
// RESTful demo app - Modal Dialogue for Editing Customers
portfolioApp.directive('customerModalDialogueEdit', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardModalEdit.html',
    scope: {
      showModalEdit: '=',
      currentCustomer: '=',
      submitChanges: '&',
      hideModal: '&'
      }
    };
});
// RESTful demo app - Modal Dialogue for Deleting Customers
portfolioApp.directive('customerModalDialogueDelete', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardModalDelete.html',
    scope: {
      showModalDlete: '=',
      currentCustomer: '=',
      deleteCurrentCustomer: '&',
      hideModal: '&'
      }
    };
});
// RESTful demo app - Modal Dialogue for Create Customers
portfolioApp.directive('customerModalDialogueCreate', function(){
  return {
    templateUrl: '/assets/templates/directives/customerCardModalCreate.html',
    scope: {
      newCustomerObject: '=',
      showModalCreate: '=',
      submitNewCustomer: '&',
      hideModal: '&'
      }
    };
});

//################################
// CONTROLLERS
//################################

portfolioApp.controller('main', ['$scope', '$document', function($scope, $document){
 $document[0].body.style.visibility = "visible";
}]);

portfolioApp.controller('customerServicePortal', ['$scope', '$resource', 'CustomersAPI', function($scope, $resource, CustomersAPI){
  //INITIAL SETUP
  $scope.currentCustomer = {};
  $scope.customers = [];
  $scope.searchString = "";
  $scope.customers = CustomersAPI.query(function(){
     if($scope.customers[0]){ $scope.currentCustomer = $scope.customers[0]; }  
  });

  // SET CURRENT CUSTOMER ID
  $scope.setCurrentCustomerId = function(customer){
    $scope.currentCustomer = customer;
  };
  // TYPEAHEAD SEARCH

  $scope.$watch('searchString', function(){
    $scope.customerSearch();
  });
  // MODAL DIALOGUES
  // Customer Edit
  $scope.showModalEdit = false;
  $scope.toggleModalEdit = function() {
    $scope.showModalEdit = true;
  };
  $scope.hideModalEdit = function() {
    $scope.showModalEdit = false;
    $scope.currentCustomer = CustomersAPI.get( {id: $scope.currentCustomer._id});
  };
  $scope.submitChanges = function(customerObject){
    CustomersAPI.edit({customerObject: $scope.sanitiseCustomer(customerObject)}, function(){
      $scope.showModalEdit = false;
      $scope.searchString = customerObject.first_name + " " + customerObject.last_name + " " + customerObject.company;
    });
  };
  // Customer Create
  $scope.newCustomer = {};
  $scope.showModalCreate = false;
  $scope.toggleModalCreate = function() {
    $scope.showModalCreate = true;
  };
  $scope.hideModalCreate = function() {
    $scope.showModalCreate = false;
  };
  $scope.submitNewCustomer = function(customerObject){
    CustomersAPI.save({customerObject: $scope.sanitiseCustomer(customerObject)}, function(returnedCustomer){
      $scope.showModalCreate = false;
      $scope.searchString = customerObject.first_name + " " + customerObject.last_name + " " + customerObject.company;
    });
  };
  // Customer Delete
  $scope.showModalDelete = false;
  $scope.toggleModalDelete = function() {
    $scope.showModalDelete = !$scope.showModalDelete;
  };
  $scope.hideModalDelete = function() {
    $scope.showModalDelete = false;
  };
  $scope.deleteCurrentCustomer = function(){
    $scope.showModalDelete = false;
    CustomersAPI.delete({id: $scope.currentCustomer._id}, function(){
      if($scope.customers[0]._id) $scope.currentCustomer = CustomersAPI.get( {id: $scope.customers[0]._id});
      $scope.searchString = "";
    });
  };
  // Sanitisation of customer objects
  $scope.sanitiseCustomer = function(customerObject){
    // Sanitise before sending to API
    var customerSanitised = customerObject;
    customerSanitised.first_name = customerSanitised.first_name.toLowerCase();
    customerSanitised.last_name = customerSanitised.last_name.toLowerCase();
    customerSanitised.company = customerSanitised.company.toLowerCase();
    return customerSanitised;
  }
  // Customer Search
  // Reduce total number of API calls by using setTimeout and clearTimeout
  var timeoutID;
  $scope.customerSearch = function(){
      if(timeoutID) clearTimeout(timeoutID);
      timeoutID = setTimeout(function(){
        $scope.customers = CustomersAPI.query({searchString: $scope.searchString}, function(){
          if($scope.customers[0]){
            for(var i = 0; i < $scope.customers.length; i++){
              $scope.customers[i].first_name = $scope.customers[i].first_name[0].toUpperCase() + 
                                                            $scope.customers[i].first_name.substr(1);
              $scope.customers[i].last_name  = $scope.customers[i].last_name[0].toUpperCase()  + 
                                                            $scope.customers[i].last_name.substr(1);
              $scope.customers[i].company    = $scope.customers[i].company[0].toUpperCase()    + 
                                                            $scope.customers[i].company.substr(1);
              }
          }
            $scope.currentCustomer = $scope.customers[0];
        }); 
      }, 500);
  }
}]);
