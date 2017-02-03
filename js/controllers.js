app.controller("homeController", function indexController($scope){
	$scope.usuarios = [
		{
			nombre : "Israel Parra",
			web : "https://www.uno-de-piera.com",
			edad : "32 años",
			profesion : "programador web"
		},
		{
			nombre : "Pepito",
			web : "http://pepito.com",
			edad : "? años",
			profesion : "vender palotes!"
		}
	]
})
 

app.controller("registroController", function homeController($scope, $location){
	$scope.saludo = "Hola desde el controlador home";
	$scope.toLogin = function(){
		$location.url("/login");
	}
});
 
app.controller("loginController", function loginController($scope, $location){
	$scope.saludo = "Hola desde el controlador login";
	$scope.toHome = function(){
		$location.url("/home");
	}
})