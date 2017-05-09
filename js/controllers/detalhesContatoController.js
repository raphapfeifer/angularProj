    angular.module("listaTelefonica").controller("detalhesContatoController",['$scope','$routeParams','contato',function($scope,$routeParams,contato){
        $scope.contato = contato.data;
    }]);