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
        todo.saveTodoInStorage, {
        success: [ todo.removeSyncFlag ]
        }
      ]
    ],
    error: []
  }
];

exports.removeTodo = [
  todo.removeTodo,
  todo.saveTodoInStorage
  //todo нужно обновлять данные аттрибутов в оставшихся todo
];
