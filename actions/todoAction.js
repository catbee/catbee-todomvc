var Baobab = require('baobab');
var _ = require('lodash');
var STORAGE_KEY = 'TODO_LIST';

const COMPLETED_TODO = 'completed';
const ACTIVE_TODO = 'active';

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
    if (!value || value.length < 1) {
      output.error();
    } else {
      output.success();
    }
  },

  addNewTodo (args, state) {
    let name = state.get(['form', 'input']);
    let id = (+new Date() + Math.floor(Math.random() * 999999));

    var todo = {
      name: name,
      id: id,
      status: 'active',
      shown: true
    };

    state.push(['todos'], todo);
  },

  removeTodo ({ id }, state) {
    let todos = state.get(['todos']);
    let index = _.findIndex(todos, todo => todo.id == id);
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

    if (isMonkeySet) {
      return;
    }

    state.set('isTodosNotEmpty', Baobab.monkey([
     ['todos'], (todos) => !_.isEmpty(todos)
    ]));
  },

  setCompletedAllStateFlag (args, state) {
    var isMonkeySet = state.get('AllCompleted');

    if (isMonkeySet) {
      return;
    }
    state.set(['AllCompleted'], Baobab.monkey([
      ['todos'], (todos = []) => {
        let result = true;
        todos.map( (todo = []) => {
          if (todo.status != COMPLETED_TODO) {
            result = false;
          }
        });
        return result;
      }
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
    let index = _.findIndex(todos, todo => todo.id == id);
    let todo = _.clone(state.get(['todos', index]), true);
    todo.status = todo.status == COMPLETED_TODO ? ACTIVE_TODO : COMPLETED_TODO;
    todo.checked = !todo.checked;

    state.set(['todos', index], todo);
  },

  toggleAllCompletedTodo ( { isCompleted }, state ) {
    let todos = _.clone(state.get(['todos']), true);
    let status = isCompleted ? COMPLETED_TODO : ACTIVE_TODO;

    todos = todos.map(todo => {
      todo.status = status;
      todo.checked = isCompleted;
      return todo;
    });

    state.set(['todos'], todos);
  },

  removeCompletedTodo (args, state) {
    let todos = state.get(['todos']).filter( (v = []) => v.status == ACTIVE_TODO);
    state.set(['todos'], todos);
  },

  setComputedTodos (args, state) {
    state.set(['todosComputed'], Baobab.monkey([
      ['filters', 'isActive'],
      ['todos'],
      ( activeFilter, todos ) => {
        let cloneTodo = _.clone(todos, true);
        return cloneTodo.map( todo => {
          todo.shown = (!activeFilter || todo.status == activeFilter);
          return todo;
        });
      }
    ]));
  }
};
