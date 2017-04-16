angular.module("listaTelefonica").controller("contatosController",function($scope,contatos,operadoras,serialGenerator,contatosAPI,$location){
				$scope.app = "Lista Telefonica";
				$scope.contatos = contatos.data;
				$scope.operadoras = operadoras.data;

				
				var generateSerial  = function (contatos) {
						contatos.forEach(function(item){
							item.serial = serialGenerator.generate();
						});
				};

				$scope.apagarContatos = function(contatos){
						var contatosExistentes = [];
						 contatos.forEach(function(contato){
							if(contato.selecionado ){
									contatosAPI.deleteContato(contato.id).success(function(data){
								});
							}else{
								contatosExistentes.push(contato);
							}	
						});
						$scope.contatos = contatosExistentes;
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
				
				generateSerial($scope.contatos);
							
			});
