const utils = require('../actions/utils');
const todo = require('../actions/todo');
const filters = require('../actions/filters');

/**
 * Sets new input's value
 * @type {*[]}
 */
exports.newTodoInput = [
  utils.setInputValue
];

/**
 * Adds new todo item
 * @type {*[]}
 */
exports.addNewTodo = [
  todo.validateNewTodo, {
    success: [
      todo.addNewTodo,
      todo.clearForm,
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
 * Removes todo
 * @type {*[]}
 */
exports.removeTodo = [
  todo.removeTodo,
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
 * Sets all todos as 'completed'/'not completed'
 * @type {*[]}
 */
exports.toggleAllCompleted = [
  todo.toggleAllCompletedTodo,
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
 * Removes all completed todos
 * @type {*[]}
 */
exports.removeCompleted = [
  todo.removeCompletedTodo,
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
 * Sets active filter
 * @type {*[]}
 */
exports.setActiveFilter = [
  filters.setActiveFilter
];
