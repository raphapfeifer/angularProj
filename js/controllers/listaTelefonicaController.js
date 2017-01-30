angular.module("listaTelefonica").controller("listaTelefonicaController",function($scope,$filter,$http){
				$scope.app = "Lista Telefonica";
				$scope.contatos = [];
				/*$scope.contatos = [
					{nome:$filter('uppercase')("Pedro"),telefone: "99998888",data: new Date(),operadora: {nome: "Oi",codigo:14,categoria: "Celular"},cor:"blue"},
					{nome: "Ana",telefone: "99998888",data: new Date(),operadora:{nome:"Vivo",codigo:15,categoria:"Celular"},cor:"yellow"},
					{nome: "Maria",telefone: "99998888",data: new Date(),operadora:{nome:"Tim",codigo:41,categoria:"Celular"},cor:"red"}
				];*/
				$scope.operadoras = [
					{nome:"Oi",codigo:14,categoria:"Celular",preco:2},
					{nome:"Vivo",codigo:15,categoria:"Celular",preco:1},
					{nome:"Tim",codigo:41,categoria:"Celular",preco:3},
					{nome:"GVT",codigo:25,categoria:"Fixo",preco:1},
					{nome:"Embratel",codigo:21,categoria:"Fixo",preco:2}
				
				];
				
				
				var carregarContatos = function () {
					$http.get("http://localhost:3412/contatos").success(function(data,status){
						$scope.contatos = data;
					});
				};
				
				$scope.adicionarContato = function(contato){
					$scope.contatos.push(contato);
					delete $scope.contato;
					$scope.contatoForm.$setPristine();
				};
				$scope.apagarContatos = function(contatos){
					$scope.contatos = contatos.filter(function (contato){
							if(!contato.selecionado) return contato;
					});
				};
				$scope.isContatoSelecionado = function (contatos){
					return contatos.some(function(contato){
						return contato.selecionado;
					});
				};
				$scope.ordenarPor = function(campo){
					$scope.criterioDeOrdenacao = campo;
					$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
				}
				
				carregarContatos();
				
			});