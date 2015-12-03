var statementsAction = require('../actions/statementsAction');
var counterAction = require('../actions/counterAction');
var filtersAction = require('../actions/filtersAction');
var todoAction = require('../actions/todoAction');

/**
 * Application route
 */
exports.route = [
  statementsAction.setTitle,
  statementsAction.setHeader,
  counterAction.setBaseCount,
  filtersAction.setFiltersList,
  filtersAction.setActiveFilter,
  todoAction.setTodosStateFlag,
  todoAction.setCompletedAllStateFlag
];

/**
 * Executes actions, when document binds
 * Loading todos from localStorage
 * @type {*[]}
 */
exports.appReady = [
  [
    todoAction.loadStorageTodos, {
      success: [
        todoAction.setTodos,
        todoAction.setTodosIdsMap,
        todoAction.setComputedTodos
      ]
    }
  ]
];

