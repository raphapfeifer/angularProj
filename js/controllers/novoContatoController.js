angular.module("listaTelefonica").controller("novoContatoController",['$scope','contatosAPI','serialGenerator','$location','operadoras',function($scope,contatosAPI,serialGenerator,$location,operadoras){
				$scope.operadoras = operadoras.data;

				$scope.adicionarContato = function(contato){
					contato.serial = serialGenerator.generate();
					contato.operadora = angular.copy(contato.operadora);
					contatosAPI.saveContato(contato).success(function(data){
						delete $scope.contato;
						$scope.contatoForm.$setPristine();
						$location.path("/contatos");
					});
				};
				
			}]);
