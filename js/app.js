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
	.when("/ingreso", {
		templateUrl : "templates/ingreso.html",
		controller : "ingresoController"
	})
	.when("/contacto", {
		templateUrl : "templates/contacto.html",
		controller : "contactoController"
	})
	.when("/inicio", {
		templateUrl : "templates/inicio.html",
		controller : "inicioController"
	})
	.when("/tutor", {
		templateUrl : "templates/tutor.html",
		controller : "tutorController"
	})
	.when("/administrador", {
		templateUrl : "templates/administrador.html",
		controller : "adminController"
	})
	.when("/registroEst", {
		templateUrl : "templates/registroEst.html",
		controller : "regestController"
	})
	.when("/estudiante", {
		templateUrl : "templates/estudiante.html",
		controller : "estController"
	})
	.when("/olvido", {
		templateUrl : "templates/olvido.html",
		controller : "olvidoController"
	})
	.when("/palabraNueva", {
		templateUrl : "templates/palabraNueva.html",
		controller : "nuevaController"
	})
	.otherwise({ reditrectTo : "/" });
})