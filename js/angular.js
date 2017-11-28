var app = angular.module("peliculas",[]);

app.controller("movieList", function($scope, $http){
    $scope.posterImg = "https://image.tmdb.org/t/p/w300/";
    /*REQUEST DE PELICULAS A LA API*/
    getMovies = function(nomPeli){
      var nomPeli = document.getElementById('input').value;
      $http({
        method: 'GET',
        url: "https://api.themoviedb.org/3/search/movie?api_key=7864c0c825bcf137a4a241a5f7083920&language=es-ES&query=" + nomPeli
      }).then(function successCallback(respuesta) {
        $scope.json = respuesta;
        for (var i in respuesta.data.results) {
          var obj = respuesta.data.results[i];
          var idMovie = obj.id;
          /*REQUEST DE IMAGENES A LA API*/
          getImgMovies = function(idMovie){
            $http({
              method: 'GET',
              url: "https://api.themoviedb.org/3/movie/" + idMovie +"/images?api_key=7864c0c825bcf137a4a241a5f7083920"
            }).then(function successCallback(datos) {
              // ***********
            }, function errorCallback(datos) {
              console.log(datos);
            });
          } // getImgMovies END
          getImgMovies(idMovie);
        } // FOR CYCLE END
      }, function errorCallback(respuesta) {
        console.log(respuesta);
      });
    } // getMovies END
});
