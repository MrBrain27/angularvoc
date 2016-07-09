/**
 * Created by aaa on 03.07.2016.
 */

var app = angular.module('VocabActions', ["ngRoute"])

  .controller("myCtrl", function($scope, $http) {

  $scope.words = [];
  $scope.vocabs = [];

  $http.get('/user/find').success(function(data) {
    var temp = {};
    for (var i = 0; i < data.length; i++) {
      data[i].index = i;
      temp[data[i].vocab] = true;
    }
    $scope.vocabs = Object.keys(temp);
    $scope.words = data;
  });

  //Добавление нового словаря

  $scope.addvocab = function() {
    $scope.vocabs.push($scope.newvocab);

    $scope.newvocab = '';
  };

  //Добавление нового слова
  $scope.addword = function(words) {

    $http.get('/user/create?word=' + $scope.newword + '&description=' + $scope.newdescription + '&vocab=' + $scope.newvocab).success(function(data){

      words.push({
        word: $scope.newword,
        description: $scope.newdescription,
        vocab: $scope.newvocab
      })
    });

  };

  //Редактирование существующего слова
  $scope.editword = function(word) {
    $scope.editedword = word;
  };


  //Завершение редактирования и изменения данных в моделе

  $scope.doneEditing = function(word) {

    $http.put('/user/' + word.id, {
      word: word.word,
      description: word.description,
      vocab: word.vocab
    }).success(function() {
      $scope.editedword = null;
    });

  };

  //Удаление слова
  $scope.removeword = function(word) {

    $http.delete('/user/' + word.id, {
      params: {
        completed: true
      }

    }).success(function() {
      $scope.words.splice($scope.words.indexOf(word), 1);
    });

  };

  })

  // Настраиваем роутинг и шаблоны

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/vocs', {
      templateUrl: '/templates/vocabs.html'
    }).

    when('/addword', {
      templateUrl: '/templates/addword.html'
    }).

    when('/addvocab', {
      templateUrl: '/templates/addvocab.html'
    }).

    when('/:vocab', {
      templateUrl: '/templates/words.html',
      controller: "WCtrl",
      controllerAs: "voc"
    }).

    otherwise({
      redirectTo: '/vocs'
    });

  }])

  .controller('WCtrl', function($routeParams) {
    var self = this;
    self.message = $routeParams.vocab
  });
