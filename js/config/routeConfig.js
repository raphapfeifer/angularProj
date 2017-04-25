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
    $routeProvider.when("/detalhesContato/:id",{
        templateUrl: "view/detalhesContato.html",
        controller: "detalhesContatoController",
        resolve:{
            contato: function (contatosAPI,$route){
                return contatosAPI.getContato($route.current.params.id);
            }
        }
    });
    $routeProvider.when("/error",{
        templateUrl: "view/error.html"
    });
    $routeProvider.otherwise({redirectTo: "/contatos"});
});