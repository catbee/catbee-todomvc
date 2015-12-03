var utilsAction = require('../actions/utilsAction');
var todoAction = require('../actions/todoAction');
var filtersAction = require('../actions/filtersAction');

/**
 * Sets new input's value
 * @type {*[]}
 */
exports.newTodoInput = [
  utilsAction.setInputValue
];

/**
 * Adds new todo item
 * @type {*[]}
 */
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

/**
 * Removes todo
 * @type {*[]}
 */
exports.removeTodo = [
  todoAction.removeTodo,
  todoAction.setSyncFlag,
  [
    todoAction.syncTodoInStorage, {
      success: [ todoAction.removeSyncFlag ]
    }
  ]
];

/**
 * Sets all todos as 'completed'/'not completed'
 * @type {*[]}
 */
exports.toggleAllCompleted = [
  todoAction.toggleAllCompletedTodo,
  todoAction.setSyncFlag,
  [
    todoAction.syncTodoInStorage, {
      success: [ todoAction.removeSyncFlag ]
    }
  ]
];

/**
 * Removes all completed todos
 * @type {*[]}
 */
exports.removeCompleted = [
  todoAction.removeCompletedTodo,
  todoAction.setSyncFlag,
  [
    todoAction.syncTodoInStorage, {
      success: [ todoAction.removeSyncFlag ]
    }
  ]
];

/**
 * Sets active filter
 * @type {*[]}
 */
exports.setActiveFilter = [
  filtersAction.setActiveFilter
];
