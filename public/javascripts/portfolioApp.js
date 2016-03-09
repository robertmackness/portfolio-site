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
    .when('/portfolio', {
      templateUrl: 'assets/templates/template-portfolio.html',
    })
    .when('/portfolio/customerserviceportal', {
      templateUrl: 'assets/templates/template-portfolio-customer-service-portal.html',
    })
    .when('/blog', {
      templateUrl: 'assets/templates/template-blog.html',
    })
});

//################################
// FACTORIES AND CUSTOM DIRECTIVES
//################################
// RESTful demo app - Customer API consumption
portfolioApp.factory("CustomersAPI", function($resource) {
  return $resource("/customers/:id", {id: "@id"}, {
      edit:  {method:'PUT', params: {id: "id"}},
  });
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
      toggleModalDelete: '&'      
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
      hideModal: '&'
      }
    }
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
    }
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
    }
});

//################################
// CONTROLLERS
//################################
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
  }
  // TYPEAHEAD SEARCH
  // Reduce total number of API calls by using setTimeout and clearTimeout
  var timeoutID;
  $scope.$watch('searchString', function(){
      if(timeoutID) clearTimeout(timeoutID);
      timeoutID = setTimeout(function(){
        $scope.customers = CustomersAPI.query({searchString: $scope.searchString}, function(){
          if($scope.customers[0]){ $scope.currentCustomer = $scope.customers[0]; }  
        })    
      }, 500);
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
  }
  $scope.submitChanges = function(customerObject){
    CustomersAPI.edit({customerObject: customerObject}, function(){
        $scope.customers = CustomersAPI.query({searchString: $scope.searchString}, function(){
          $scope.currentCustomer = CustomersAPI.get( {id: $scope.customers[0]._id});
          $scope.showModalEdit = false;
        });
    });
  }
  // Customer Create
  $scope.newCustomer = {};
  $scope.showModalCreate = false;
  $scope.toggleModalCreate = function() {
    $scope.showModalCreate = true;
  };
  $scope.hideModalCreate = function() {
    $scope.showModalCreate = false;
  }
  $scope.submitNewCustomer = function(customerObject){
    CustomersAPI.save({customerObject: customerObject}, function(returnedCustomer){
      $scope.showModalCreate = false;
      $scope.currentCustomer = CustomersAPI.get( {id: returnedCustomer._id});
      $scope.searchString = "";
    });

  }
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
    });
  }
}]);

