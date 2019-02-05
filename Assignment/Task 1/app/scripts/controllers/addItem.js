/**
 * Created by Marc Antel on 2019/01/29.
 */
angular.module('ToDoList')
    .controller('AddItem', function($scope, submitItem) {

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
    });