var Baobab = require('baobab');
var _ = require('lodash');
var STORAGE_KEY = 'TODO_LIST';

const COMPLETED_TODO = 'completed',
      ACTIVE_TODO = 'active';

module.exports = {
  loadStorageTodos (args, state, output, { locator }) {
    var storage = locator.resolve('storage');

    storage.getByKey(STORAGE_KEY)
      .then(todos => output.success({ todos }))
      .catch(error => output.error({ error }));
  },

  setTodos ({ todos }, state) {
    state.set('todos', todos ? todos : []);
  },

  validateNewTodo ( { value }, state, output) {
    //var value = state.get(['form', 'input']);

    if (!value || value.length < 1) {
      output.error();
    } else {
      output.success();
    }
  },

  addNewTodo (args, state, output) {
    var todo = {
      name: state.get(['form', 'input']),
      id: (+new Date() + Math.floor(Math.random() * 999999)),
      status: 'active',
      shown: true
    };
    state.push('todos', todo);

  },

  removeTodo ({ id }, state, output) {
    let todos = state.get(['todos']);
    let index = _.findIndex(todos, v => v.id == id);
    state.splice('todos', [index, 1]);
  },

  syncTodoInStorage (args, state, output, { locator }) {
    var storage = locator.resolve('storage');
    var todos = state.get('todos');

    storage.setByKey(STORAGE_KEY, todos)
      .then(output.success)
      .catch(output.error);
  },

  setTodosIdsMap (args, state) {
    state.set('todoIds', Baobab.monkey([
      ['todos'], (todos) => todos.map(todo => todo.id)
    ]));
  },

  setSyncFlag (args, state) {
    state.set('isSyncing', true);
  },

  removeSyncFlag (args, state) {
    state.set('isSyncing', false);
  },

  clearForm (args, state) {
    state.unset(['form', 'input']);
  },

  setTodosStateFlag (args, state) {
    var isMonkeySet = state.get('isTodosNotEmpty');

    if (isMonkeySet){
      return;
    }

    state.set('isTodosNotEmpty', Baobab.monkey([
     ['todos'], (todos) => todos && todos.length > 0
    ]));
  },

  setEditingTodo ({ id }, state) {
    let todos = state.get(['todos']);
    let index = _.findIndex(todos, v => v.id == id);
    state.set(['todos', index, 'editing'], true);

  },

  saveEditingTodo ( args, state) {
    let todos = state.get(['todos']);
    let index = _.findIndex(todos, v => v.id == args.id);
    state.set(['todos', index, 'name' ], args.value );
  },

  cancelEditingTodo ( args, state) {
    let todos = state.get(['todos']);
    todos.map( (v, index) => state.set(['todos', index, 'editing'], false));
  },

  toggleCompletedTodo ( { id }, state) {
    let todos = state.get(['todos']);
    let index = _.findIndex(todos, v => v.id == id);
    let status = state.get(['todos', index, 'status']);
    status = status == COMPLETED_TODO ? ACTIVE_TODO : COMPLETED_TODO;
    state.set(['todos', index, 'status'], status);
  },

  toggleAllCompletedTodo ( { isCompleted }, state ) {
    let todos = state.get(['todos']),
        status = isCompleted ? COMPLETED_TODO : ACTIVE_TODO;
    todos.map( (v, index) => state.set(['todos', index, 'status'], status));
  },

  removeCompletedTodo (args, state) {
    let todos = state.get(['todos']).filter( (v = []) => v.status == ACTIVE_TODO);
    state.set(['todos'], todos);
  },

  applyFilter ( args , state ) {
    let filterName = state.get(['filters', 'isActive']);
    let todos = state.get(['todos']) || [];
    let isShown;
    todos.map( (v, index) => {

      if (!filterName) isShown = true;
      else isShown = filterName == v.status;

      state.set(['todos', index, 'shown'], isShown);

      console.log(state.get(['filters']));

    });
  }
};
