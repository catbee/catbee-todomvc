var todoAction = require('../actions/todoAction');

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