/**
 * Created by Marc Antel on 2019/01/29.
 */
var config = {
    apiKey: "AIzaSyDj-CHlMUfoyhacXv-7cfsmOv_IDgqbViM",
    authDomain: "todo-list-89fea.firebaseapp.com",
    databaseURL: "https://todo-list-89fea.firebaseio.com",
    projectId: "todo-list-89fea",
    storageBucket: "todo-list-89fea.appspot.com",
    messagingSenderId: "602595915148"
};

firebase.initializeApp(config);

angular
  .module('ToDoList', [
        'ui.router',
        'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/main');
    $urlRouterProvider.otherwise('/dashboard/main');

    $stateProvider
        .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('main', {
            url: '/main',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/main.html',
        })
        .state('addarticle', {
              url: '/additem',
              parent: 'dashboard',
              templateUrl: 'views/dashboard/addItem.html',
              controller: 'AddItem'
        })
        .state('editarticle', {
              url: '/edititem',
              parent: 'dashboard',
              templateUrl: 'views/dashboard/editItem.html',
              controller: 'EditItem'
        });
  });
