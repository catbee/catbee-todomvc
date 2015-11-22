var statements = require('../actions/statements');
var counter = require('../actions/counter');
var filters = require('../actions/filters');
var todo = require('../actions/todo');

exports.route = [
  statements.setTitle,
  statements.setHeader,
  counter.setBaseCount,
  filters.setActiveFilter,
  filters.setFiltersList,
  todo.setTodosStateFlag
];

exports.appReady = [
  [
    todo.loadStorageTodos, {
      success: [
        todo.setTodos,
        todo.setTodosIdsMap
      ]
    }
  ]
];
