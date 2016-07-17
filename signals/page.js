const statements = require('../actions/statements');
const counter = require('../actions/counter');
const filters = require('../actions/filters');
const todo = require('../actions/todo');

/**
 * Application route
 */
exports.route = [
  statements.setTitle,
  statements.setHeader,
  counter.setBaseCount,
  filters.setFiltersList,
  filters.setActiveFilter,
  todo.setTodosStateFlag,
  todo.setCompletedAllStateFlag
];

/**
 * Executes actions, when document binds
 * Loading todos from localStorage
 * @type {*[]}
 */
exports.appReady = [
  [
    todo.loadStorageTodos, {
      success: [
        todo.setTodos,
        todo.setTodosIdsMap,
        todo.setComputedTodos
      ]
    }
  ]
];

