angular.module("listaTelefonica").factory("contatosAPI",['$http','config',function ($http,config){

   // var firebase = require('firebase');

    var _getContatos = function () {
        //return $http.get(config.baseUrl + "/contatos"); 
       var lista = [];
       var query = firebase.database().ref('contatos').orderByKey();
        query.on('value',function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var item = childSnapshot.val();
                item.id = childSnapshot.key;
                
                //console.log(item);
                return lista.push(item);
            });
        });
       return lista;
        //console.log(lista);
        //return lista; 
    };

    var _getContato = function (id){
        return $http.get(config.baseUrl + "/contatos/" + id);
    };

    var _saveContato = function(contato) {
        //console.log(contato.operadora);
        firebase.database().ref().child('contatos').push(contato);
        return $http.post(config.baseUrl + "/contatos",contato);
    };

    var _deleteContato = function(contatoId){
        return $http.delete(config.baseUrl + "/contatos/" + contatoId);
    };

    return{
        getContatos: _getContatos,
        getContato: _getContato,
        saveContato: _saveContato,
        deleteContato: _deleteContato
    };

}]);