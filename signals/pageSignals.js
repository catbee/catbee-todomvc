var statementsAction = require('../actions/statementsAction');
var counterAction = require('../actions/counterAction');
var filtersAction = require('../actions/filtersAction');
var todoAction = require('../actions/todoAction');

exports.route = [
  statementsAction.setTitle,
  statementsAction.setHeader,
  counterAction.setBaseCount,
  filtersAction.setActiveFilter,
  filtersAction.setFiltersList,
  todoAction.setTodosStateFlag
];

exports.appReady = [
  [
    todoAction.loadStorageTodos, {
      success: [
        todoAction.setTodos,
        todoAction.setTodosIdsMap
      ]
    }
  ]
];

exports.clickOnPage = [
  todoAction.cancelEditingTodo
];
