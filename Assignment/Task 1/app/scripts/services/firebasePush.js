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