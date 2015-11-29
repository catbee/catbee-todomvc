var todoAction = require('../actions/todoAction'),
    counterAction = require('../actions/counterAction');

exports.todoItemDoubleClick = [
  todoAction.setEditingTodo
];

exports.todoItemOneClick = [
  todoAction.clearAllEditingTodos
];

exports.todoItemOnEnter = [
  todoAction.validateNewTodo, {
    success: [
      todoAction.clearAllEditingTodos,
      todoAction.saveEditingTodo,
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

exports.todoItemOnToggleCompleted = [
    todoAction.toggleCompletedTodo
];