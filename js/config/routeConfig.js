angular.module("listaTelefonica").config(function($routeProvider){
    $routeProvider.when("/contatos", {
        templateUrl: "view/contatos.html",
        controller: "contatosController",
        resolve:{
            contatos: function(contatosAPI){
                return contatosAPI.getContatos();
            },
            operadoras: function(operadorasAPI){
                return operadorasAPI.getOperadoras();
            }   
        }
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