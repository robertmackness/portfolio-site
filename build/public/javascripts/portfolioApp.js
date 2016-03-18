var portfolioApp=angular.module("portfolioApp",["ngRoute","ngResource"]);portfolioApp.config(["$routeProvider",function(e){e.when("/",{templateUrl:"assets/templates/template-main.html"}).when("/portfolio",{templateUrl:"assets/templates/template-portfolio.html"}).when("/portfolio/customerserviceportal",{templateUrl:"assets/templates/template-portfolio-customer-service-portal.html"})}]),portfolioApp.factory("CustomersAPI",["$resource",function(e){return e("/customersAPI/:id",{id:"@id"},{edit:{method:"PUT",params:{id:"id"}}})}]),portfolioApp.directive("customerCardBrief",function(){return{templateUrl:"/assets/templates/directives/customerCardBrief.html",scope:{customers:"="}}}),portfolioApp.directive("customerCardFull",function(){return{templateUrl:"/assets/templates/directives/customerCardFull.html",scope:{customer:"=",toggleModalEdit:"&",toggleModalDelete:"&"}}}),portfolioApp.directive("customerModalDialogueEdit",function(){return{templateUrl:"/assets/templates/directives/customerCardModalEdit.html",scope:{showModalEdit:"=",currentCustomer:"=",submitChanges:"&",hideModal:"&"}}}),portfolioApp.directive("customerModalDialogueDelete",function(){return{templateUrl:"/assets/templates/directives/customerCardModalDelete.html",scope:{showModalDlete:"=",currentCustomer:"=",deleteCurrentCustomer:"&",hideModal:"&"}}}),portfolioApp.directive("customerModalDialogueCreate",function(){return{templateUrl:"/assets/templates/directives/customerCardModalCreate.html",scope:{newCustomerObject:"=",showModalCreate:"=",submitNewCustomer:"&",hideModal:"&"}}}),portfolioApp.controller("customerServicePortal",["$scope","$resource","CustomersAPI",function(e,t,o){e.currentCustomer={},e.customers=[],e.searchString="",e.customers=o.query(function(){e.customers[0]&&(e.currentCustomer=e.customers[0])}),e.setCurrentCustomerId=function(t){e.currentCustomer=t},e.$watch("searchString",function(){e.customerSearch()}),e.showModalEdit=!1,e.toggleModalEdit=function(){e.showModalEdit=!0},e.hideModalEdit=function(){e.showModalEdit=!1,e.currentCustomer=o.get({id:e.currentCustomer._id})},e.submitChanges=function(t){o.edit({customerObject:e.sanitiseCustomer(t)},function(){e.showModalEdit=!1,e.searchString=t.first_name+" "+t.last_name+" "+t.company})},e.newCustomer={},e.showModalCreate=!1,e.toggleModalCreate=function(){e.showModalCreate=!0},e.hideModalCreate=function(){e.showModalCreate=!1},e.submitNewCustomer=function(t){o.save({customerObject:e.sanitiseCustomer(t)},function(o){e.showModalCreate=!1,e.searchString=t.first_name+" "+t.last_name+" "+t.company})},e.showModalDelete=!1,e.toggleModalDelete=function(){e.showModalDelete=!e.showModalDelete},e.hideModalDelete=function(){e.showModalDelete=!1},e.deleteCurrentCustomer=function(){e.showModalDelete=!1,o["delete"]({id:e.currentCustomer._id},function(){e.customers[0]._id&&(e.currentCustomer=o.get({id:e.customers[0]._id})),e.searchString=""})},e.sanitiseCustomer=function(e){var t=e;return t.first_name=t.first_name.toLowerCase(),t.last_name=t.last_name.toLowerCase(),t.company=t.company.toLowerCase(),t};var r;e.customerSearch=function(){r&&clearTimeout(r),r=setTimeout(function(){e.customers=o.query({searchString:e.searchString},function(){if(e.customers[0])for(var t=0;t<e.customers.length;t++)e.customers[t].first_name=e.customers[t].first_name[0].toUpperCase()+e.customers[t].first_name.substr(1),e.customers[t].last_name=e.customers[t].last_name[0].toUpperCase()+e.customers[t].last_name.substr(1),e.customers[t].company=e.customers[t].company[0].toUpperCase()+e.customers[t].company.substr(1);e.currentCustomer=e.customers[0]})},500)}}]);