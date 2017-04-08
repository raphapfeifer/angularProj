angular.module("listaTelefonica").config(function($routeProvider){
    $routeProvider.when("/contatos", {
        templateUrl: "view/contatos.html",
        controller: "listaTelefonicaController"
    });
    $routeProvider.when("/novoContato",{
        templateUrl: "view/novoContato.html",
        controller: "novoContatoController",
        resolve:{
            operadoras: function(operadorasAPI){
                return operadorasAPI.getOperadoras();
            }   
        }
    });
    $routeProvider.otherwise({redirectTo: "/contatos"});
});