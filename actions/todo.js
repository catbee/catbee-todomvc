var Baobab = require('baobab');
var STORAGE_KEY = 'TODO_LIST';

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

  validateNewTodo (args, state, output) {
    var value = state.get(['form', 'input']);

    if (!value || value.length < 1) {
      output.error();
    } else {
      output.success();
    }
  },

  addNewTodo (args, state, output) {
    var todo = {
      name: state.get(['form', 'input']),
      id: state.get(['todos']).length + 1,
      status: 'active'
    };

    state.push('todos', todo);
  },

  saveTodoInStorage (args, state, output, { locator }) {
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
    state.set('editingId', Number(id));
  }
};
