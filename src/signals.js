const { actions: filters } = require('./filters/actions');
const { actions: todo } = require('./todo/actions');
const { actions: form } = require('./form/actions');
const { actions: page } = require('./page/actions');

/**
 * Application route
 */
exports.route = [
  page.initialize,
  filters.initialize,
  form.initialize,
  [
    todo.loadStorageTodos, {
      success: [
        todo.initialize
      ]
    }
  ]
];

exports.activeFilter = [ filters.enableActiveFilter ];

exports.allFilter = [ filters.enableAllFilter ];

exports.completedFilter = [ filters.enableCompletedFilter ];

const syncTodos = [
  [
    todo.syncTodoInStorage, {
      success: [
      ]
    }
  ]
];

/**
 * Sets new input's value
 * @type {*[]}
 */
exports.newTodoInput = [
  form.setInputValue
];

/**
 * Adds new todo item
 * @type {*[]}
 */
exports.addNewTodo = [
  todo.addNewTodo,
  form.clearForm,
  ...syncTodos
];

exports.markAllCompleted = [
  todo.markAllCompleted,
  ...syncTodos
];

exports.markAllActive = [
  todo.markAllActive,
  ...syncTodos
];

/**
 * Removes all completed todos
 * @type {*[]}
 */
exports.removeCompleted = [
  todo.removeCompletedTodos,
  ...syncTodos
];

/**
 * Double click on item
 * @type {*[]}
 */
exports.todoItemDoubleClick = [
  todo.editTodo
];

/**
 * Enter on item
 * @type {*[]}
 */
exports.todoItemOnEnter = [
  todo.cancelEditingTodo,
  todo.saveEditingTodo,
  ...syncTodos
];

/**
 * Click to check/uncheck item
 * @type {*[]}
 */
exports.todoItemOnToggleCompleted = [
  todo.toggleCompletedTodo,
  ...syncTodos
];

exports.markOneCompleted = [
  todo.markOneCompleted,
  ...syncTodos
];

exports.markOneActive = [
  todo.markOneActive,
  ...syncTodos
];


/**
 * Cancel editing item
 * @type {*[]}
 */
exports.cancelEditingTodo = [
  todo.cancelEditingTodo
];

/**
 * Removes todo
 * @type {*[]}
 */
exports.removeTodo = [
  todo.removeTodo,
  ...syncTodos
];
