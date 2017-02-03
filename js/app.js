var app = angular.module("app", ['ngRoute']);
 

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "templates/home.html",
		controller : "homeController"
	})
	.when("/registro", {
		templateUrl : "templates/registro.html",
		controller : "registroController"
	})
	.otherwise({ reditrectTo : "/" });
})