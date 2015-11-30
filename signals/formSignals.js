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
  todoAction.setSyncFlag,
  [
    todoAction.syncTodoInStorage, {
    success: [ todoAction.removeSyncFlag ]
    }
  ]
];

exports.toggleAllChecked = [
  todoAction.toggleAllCompletedTodo
];

exports.removeCompleted = [
  todoAction.removeCompletedTodo,
  todoAction.setSyncFlag,
  [
    todoAction.syncTodoInStorage, {
    success: [ todoAction.removeSyncFlag ]
  }
  ]
];