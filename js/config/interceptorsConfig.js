angular.module("listaTelefonica").config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push("timestampInterceptor");
    $httpProvider.interceptors.push("errorInterceptor");
    $httpProvider.interceptors.push("loadingInterceptor");
}]);