var todoAction = require('../actions/todoAction');

/**
 * Double click on item
 * @type {*[]}
 */
exports.todoItemDoubleClick = [
  todoAction.setEditingTodo
];

/**
 * Enter on item
 * @type {*[]}
 */
exports.todoItemOnEnter = [
  todoAction.validateNewTodo, {
    success: [
      todoAction.cancelEditingTodo,
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

/**
 * Click to check/uncheck item
 * @type {*[]}
 */
exports.todoItemOnToggleCompleted = [
  todoAction.toggleCompletedTodo,
  todoAction.setSyncFlag,
  [
    todoAction.syncTodoInStorage, {
      success: [ todoAction.removeSyncFlag ]
    }
  ]
];


/**
 * Cancel editing item
 * @type {*[]}
 */
exports.cancelEditingTodo = [
  todoAction.cancelEditingTodo
];
