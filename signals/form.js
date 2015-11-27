var utils = require('../actions/utils');
var todo = require('../actions/todo');

exports.newTodoInput = [
  utils.setInputValue
];

exports.addNewTodo = [
  todo.validateNewTodo, {
    success: [
      todo.addNewTodo,
      todo.clearForm,
      todo.setSyncFlag,
      [
        todo.syncTodoInStorage, {
        success: [ todo.removeSyncFlag ]
        }
      ]
    ],
    error: []
  }
];

exports.removeTodo = [

  todo.removeTodo,
  todo.syncTodoInStorage
];
