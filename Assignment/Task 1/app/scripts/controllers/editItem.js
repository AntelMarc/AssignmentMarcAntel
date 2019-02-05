/**
 * Created by Marc Antel on 2019/01/29.
 */
angular.module('ToDoList')
    .controller('EditItem', function($scope, submitItem) {

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

    });