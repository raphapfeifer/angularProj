angular.module("listaTelefonica").controller("contatosController",function($scope,contatos,operadoras,serialGenerator){
				$scope.app = "Lista Telefonica";
				$scope.contatos = contatos.data;
				$scope.operadoras = operadoras.data;

				
				var generateSerial  = function (contatos) {
						contatos.forEach(function(item){
							item.serial = serialGenerator.generate();
						});
				};

				/*var contador = function(contatos){
					var cont = 1;
					contatos.forEach(function(item){
						item.id = cont++;	
					});
				};*/

				$scope.apagarContatos = function(contatos){
					 contatos.filter(function(contato){
						if(contato.selecionado)
							contatosAPI.deleteContato(contato).success(function(data){
							$scope.contatos = data;
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
				
				generateSerial($scope.contatos);
				//contador($scope.contatos);
				
				
			});
