const todo = require('../actions/todo');

/**
 * Double click on item
 * @type {*[]}
 */
exports.todoItemDoubleClick = [
  todo.setEditingTodo
];

/**
 * Enter on item
 * @type {*[]}
 */
exports.todoItemOnEnter = [
  todo.validateNewTodo, {
    success: [
      todo.cancelEditingTodo,
      todo.saveEditingTodo,
      todo.setSyncFlag,
      [
        todo.syncTodoInStorage, {
          success: [
            todo.removeSyncFlag
          ]
        }
      ]
    ],
    error: []
  }
];

/**
 * Click to check/uncheck item
 * @type {*[]}
 */
exports.todoItemOnToggleCompleted = [
  todo.toggleCompletedTodo,
  todo.setSyncFlag,
  [
    todo.syncTodoInStorage, {
      success: [
        todo.removeSyncFlag
      ]
    }
  ]
];


/**
 * Cancel editing item
 * @type {*[]}
 */
exports.cancelEditingTodo = [
  todo.cancelEditingTodo
];
