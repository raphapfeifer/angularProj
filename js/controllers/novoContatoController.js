angular.module("listaTelefonica").controller("novoContatoController",function($scope,$filter,contatosAPI,operadorasAPI,serialGenerator){
				$scope.app = "Lista Telefonica";
				$scope.contatos = [];
				$scope.operadoras = [];
				
				var carregarOperadoras = function () {
					operadorasAPI.getOperadoras().success(function(data){
						$scope.operadoras = data;
					}).error(function(data,status) {
						$scope.message = "Aconteceu um problema: " + data;
					});
				};
				
				$scope.adicionarContato = function(contato){
					contato.serial = serialGenerator.generate();
					contatosAPI.saveContato(contato).success(function(data){
						delete $scope.contato;
						$scope.contatoForm.$setPristine();
						carregarContatos();
					});
				};
				
				carregarOperadoras();
				
			});
