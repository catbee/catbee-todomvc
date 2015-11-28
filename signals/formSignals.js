var utilsAction = require('../actions/utilsAction');
var todoAction = require('../actions/todoAction');

exports.newTodoInput = [
  utilsAction.setInputValue
];

exports.addNewTodo = [
  todoAction.validateNewTodo, {
    success: [
      todoAction.addNewTodo,
      todoAction.clearForm,
      todoAction.setSyncFlag,
      [
        todoAction.syncTodoInStorage, {
        success: [ todoAction.removeSyncFlag ]
        }
      ]
    ],
    error: []
  }
];

exports.removeTodo = [

  todoAction.removeTodo,
  todoAction.syncTodoInStorage
];
