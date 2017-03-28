angular.module("listaTelefonica").controller("listaTelefonicaController",function($scope,$filter,contatosAPI,operadorasAPI,serialGenerator){
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
					contatosAPI.getContatos().success(function(data){
						data.forEach(function(item){
							item.serial = serialGenerator.generate();
						});
						$scope.contatos = data;
					}).error(function(data,status){
						$scope.error = "Aconteceu um problema: " + data;
					});
				};

				var carregarOperadoras = function () {
					operadorasAPI.getOperadoras().success(function(data){
						$scope.operadoras = data;
					}).error(function(data,status) {
						$scope.message = "Aconteceu um problema: " + data;
					});
				};
				
				$scope.adicionarContato = function(contato){
					console.log(contato);
					contato.serial = serialGenerator.generate();
					contato.data = new Date();
					contatosAPI.saveContato(contato).success(function(data){
						delete $scope.contato;
						$scope.contatoForm.$setPristine();
						carregarContatos();
					});
				};
				
				$scope.apagarContatos = function(contatos){
		
					 contatos.filter(function(contato){
						if(contato.selecionado)
							contatosAPI.deleteContato(contato).success(function(data){
							$scope.contatos = data;
							carregarContatos();
						});
						
					});

					
					/*$scope.contatos = contatos.filter(function (contato){
							if(!contato.selecionado) return contato;
					});*/

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
				
				/*var criarUsuario = function (nome,telefone){
					return{
						nome:nome,
						telefone:telefone
					};
				};*/


				carregarContatos();
				carregarOperadoras();
				
			});
