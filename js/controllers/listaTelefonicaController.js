angular.module("listaTelefonica").controller("listaTelefonicaController",function($scope,$filter,$http){
				$scope.app = "Lista Telefonica";
				$scope.contatos = [];
				$scope.operadoras = [];
				/*$scope.contatos = [
					{nome:$filter('uppercase')("Pedro"),telefone: "99998888",data: new Date(),operadora: {nome: "Oi",codigo:14,categoria: "Celular"},cor:"blue"},
					{nome: "Ana",telefone: "99998888",data: new Date(),operadora:{nome:"Vivo",codigo:15,categoria:"Celular"},cor:"yellow"},
					{nome: "Maria",telefone: "99998888",data: new Date(),operadora:{nome:"Tim",codigo:41,categoria:"Celular"},cor:"red"}
				];*/
				/*$scope.operadoras = [
					{nome:"Oi",codigo:14,categoria:"Celular",preco:2},
					{nome:"Vivo",codigo:15,categoria:"Celular",preco:1},
					{nome:"Tim",codigo:41,categoria:"Celular",preco:3},
					{nome:"GVT",codigo:25,categoria:"Fixo",preco:1},
					{nome:"Embratel",codigo:21,categoria:"Fixo",preco:2}
				
				];*/
				
				// comentatio de teste
				var carregarContatos = function () {
					$http.get("http://localhost:3412/contatos").success(function(data){
						$scope.contatos = data;
					}).error(function(data,status){
						$scope.message = "Aconteceu um problema: " + data;
					});
				};

				var carregarOperadoras = function () {
					$http.get("http://localhost:3412/operadoras").success(function(data){
						$scope.operadoras = data;
					}).error(function(data,status) {
						$scope.message = "Aconteceu um problema: " + data;
					});
				};
				
				$scope.adicionarContato = function(contato){
					contato.data = new Date();
					$http.post("http://localhost:3412/contatos",contato).success(function(data){
						delete $scope.contato;
						$scope.contatoForm.$setPristine();
						carregarContatos();
					});
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
				carregarOperadoras();
				
			});