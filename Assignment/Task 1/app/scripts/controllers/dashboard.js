/**
 * Created by Marc Antel on 2019/01/29.
 */
angular.module('ToDoList')
  .controller('DashboardCtrl', function($scope, $rootScope, $location) {

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

  });