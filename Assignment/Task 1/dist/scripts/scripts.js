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
  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

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
  }]);

/**
 * Created by Marc Antel on 2019/01/29.
 */
angular.module('ToDoList')
  .controller('DashboardCtrl', ["$scope", "$rootScope", "$location", function($scope, $rootScope, $location) {

      /**
       * scope variable declarations used for the app
       */
      $scope.selected = {value: ""};
      $scope.itemName = "";
      $scope.itemId = "";
      $scope.list = [];

      /**
       * authentication to give access to firebase database
       */
      firebase.auth().signInAnonymously().catch(function(error) {
          console.log("authenticated");
          var errorCode = error.code;
          var errorMessage = error.message;
      });

      /**
       * @function pullToDoList, pulls the To Do list from the database and pushes it to list variable
       */
      $scope.pullToDoList = function() {
          $scope.list = []
          var listObject = firebase.database().ref('entries')

          listObject.once('value').then(function(toDoList){
              toDoList.forEach(function(item){
                  $scope.list.push(
                      {
                          name: item.val().name,
                          id: item.key
                      })
              })
              $scope.$apply();
          });
      };

      $scope.pullToDoList();

      /**
       * @param index
       * @function editEntry called when edit button is pressed
       */
      $scope.editEntry = function(index) {
          $location.path('/dashboard/edititem');
          $scope.itemName = $scope.list[index].name;
          $scope.itemId = $scope.list[index].id;
      };

      /**
       * @param index
       * @function deleteEntry called when delete button is pressed
       */
      $scope.deleteEntry = function(index)
      {
          var objectToDelete = firebase.database().ref('entries/' + $scope.list[index].id);
          objectToDelete.remove();
          $scope.list.splice(index, 1);
      };

  }]);
/**
 * Created by Marc Antel on 2019/01/29.
 */
angular.module('ToDoList')
    .controller('AddItem', ["$scope", "submitItem", function($scope, submitItem) {

        $scope.newItemName = "";

        /**
         *
         * @param itemName
         * @param itemId
         * @function push calls the submitItem method in the firebasePush service
         * to push the edited item to the database
         */
        $scope.push = function(itemName) {
            var itemId = new Date().getTime();
            $scope.submitItem = submitItem.push(itemName, itemId);
        }
    }]);
/**
 * Created by Marc Antel on 2019/01/29.
 */
angular.module('ToDoList')
    .controller('EditItem', ["$scope", "submitItem", function($scope, submitItem) {

        /**
         *
         * @param itemName
         * @param itemId
         * @function push calls the submitItem method in the firebasePush service
         * to push the edited item to the database
         */
        $scope.push = function(itemName, itemId) {
            $scope.submitItem = submitItem.push(itemName, itemId);
        }

    }]);
/**
 * Created by Marc Antel on 2019/01/29.
 */
angular.module('ToDoList')
    .service('submitItem', function() {

        /**
         * @param itemName
         * @param itemId
         * @function push, pushes item to database
         */
        this.push = function(itemName, itemId)
        {
            firebase.database().ref('entries/' + itemId).set({
                name: itemName
            }).then(function (result) {
                alert("The article has been saved");
            });
        }

    });