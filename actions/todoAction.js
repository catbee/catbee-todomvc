var Baobab = require('baobab');
var _ = require('lodash');
var STORAGE_KEY = 'TODO_LIST';

const COMPLETED_TODO = 'completed';
const ACTIVE_TODO = 'active';

module.exports = {
  /**
   * Loads todos from localStorage
   * @param {object} args
   * @param {object} state
   * @param {object} output
   * @param {object} locator
   */
  loadStorageTodos (args, state, output, { locator }) {
    var storage = locator.resolve('storage');

    storage.getByKey(STORAGE_KEY)
      .then(todos => output.success({ todos }))
      .catch(error => output.error({ error }));
  },

  /**
   * Sets todos to state
   * @param {object} args
   * @param {array} args.todos - array of todos
   * @param {object} state
   */
  setTodos ({ todos }, state) {
    state.set('todos', todos ? todos : []);
  },

  /**
   * Validates todo's text
   * @param {object} args
   * @param {object} args.value - text for new todo
   * @param {object} state
   * @param {object} output
   */
  validateNewTodo ( { value }, state, output) {
    if (!value || value.length < 1) {
      output.error();
    } else {
      output.success();
    }
  },

  /**
   * Adds new todo to state
   * @param {object} args
   * @param {object} state
   */
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

  /**
   * Removes todo from state
   * @param {object} args
   * @param {string} args.id - todo identifier
   * @param {object} state
   */
  removeTodo ({ id }, state) {
    let todoId = Number(id);
    state.unset(['todos', { id: todoId }]);
  },

  /**
   * Sets state's todos into storage
   * @param {object} args
   * @param {object} state
   * @param {object} output
   * @param {object} services
   * @param {object} services.locator
   */
  syncTodoInStorage (args, state, output, { locator }) {
    var storage = locator.resolve('storage');
    var todos = state.get('todos');

    storage.setByKey(STORAGE_KEY, todos)
      .then(output.success)
      .catch(output.error);
  },

  /**
   * Sets array of todos's id in state (with monkey)
   * @param {object} args
   * @param {object} state
   */
  setTodosIdsMap (args, state) {
    state.set('todoIds', Baobab.monkey([
      ['todos'], (todos) => todos.map(todo => todo.id)
    ]));
  },

  /**
   * Sets synchronization flag
   * @param {object} args
   * @param {object} state
   */
  setSyncFlag (args, state) {
    state.set('isSyncing', true);
  },

  /**
   * Remove synchronization flag
   * @param {object} args
   * @param {object} state
   */
  removeSyncFlag (args, state) {
    state.set('isSyncing', false);
  },

  /**
   * Clears input form
   * @param {object} args
   * @param {object} state
   */
  clearForm (args, state) {
    state.unset(['form', 'input']);
  },


  /**
   * Sets isTodosNotEmpty flag. That's means there is one or more todo in the state (with monkey)
   * @param {object} args
   * @param {object} state
   */
  setTodosStateFlag (args, state) {
    var isMonkeySet = state.get('isTodosNotEmpty');

    if (isMonkeySet) {
      return;
    }

    state.set('isTodosNotEmpty', Baobab.monkey([
     ['todos'], (todos) => !_.isEmpty(todos)
    ]));
  },

  /**
   * Sets allCompleted flag. All todos were completed (with monkey)
   * @param {object} args
   * @param {object} state
   */
  setCompletedAllStateFlag (args, state) {
    var isMonkeySet = state.get('allCompleted');

    if (isMonkeySet) {
      return;
    }
    state.set(['allCompleted'], Baobab.monkey([
      ['todos'], (todos = []) => todos.every((todo) => todo.status == COMPLETED_TODO)
    ]));
  },

  /**
   * Sets editing todo
   * @param {object} args
   * @param {string} args.id - todo identifier
   * @param {object} state
   */
  setEditingTodo ({ id }, state) {
    let todos = state.get(['todos']);
    let index = _.findIndex(todos, v => v.id == id);
    state.set(['todos', index, 'editing'], true);
  },

  /**
   * Saves edited todo
   * @param {object} args
   * @param {object} state
   */
  saveEditingTodo ( args, state) {
    let todos = state.get(['todos']);
    let index = _.findIndex(todos, v => v.id == args.id);
    state.set(['todos', index, 'name' ], args.value );
  },

  /**
   * Cancel editing todo
   * @param {object} args
   * @param {object} state
   */
  cancelEditingTodo ( args, state) {
    let todos = state.get(['todos']);
    todos.map( (v, index) => state.set(['todos', index, 'editing'], false));
  },

  /**
   * Toggles todo from completed to active and back
   * @param {object} args
   * @param {string} args.id
   * @param {object} state
   */
  toggleCompletedTodo ( { id }, state) {
    let todoId = Number(id);
    let todo = state.get(['todos', { id: todoId }]);
    let status = todo.status;
    let checked = todo.checked;

    state.set(['todos', { id: todoId }, 'status'], status == COMPLETED_TODO ? ACTIVE_TODO : COMPLETED_TODO);
    state.set(['todos', { id: todoId }, 'checked'], !checked);
  },

  /**
   * Toggles all todos from completed to active and back
   * @param {object} args
   * @param {boolean} args.isCompleted
   * @param {object} state
   */
  toggleAllCompletedTodo ( { isCompleted }, state ) {
    let todos = state.get(['todos']);
    let status = isCompleted ? COMPLETED_TODO : ACTIVE_TODO;

    todos = todos.map( (todo, index) => {
      state.set(['todos', index, 'status'], status);
      state.set(['todos', index, 'checked'], isCompleted);
    });
  },

  /**
   * Removes completed todos
   * @param {object} args
   * @param {object} state
   */
  removeCompletedTodo (args, state) {
    let todos = state.get(['todos']);
    todos.map(todo => {
      if (todo.status != ACTIVE_TODO) {
        state.unset(['todos', {id: todo.id}]);
      }
    });
  },

  /**
   * Sets dynamic nodes for todos
   * @param {object} args
   * @param {object} state
   */
  setComputedTodos (args, state) {
    state.set(['todosComputed'], Baobab.monkey([
      ['filters', 'isActive'],
      ['todos'],
      ( activeFilter, todos ) => {
        return todos.map( todo => {
          return Object.assign({}, todo, { shown: (activeFilter == 'all' || todo.status == activeFilter) });
        });
      }
    ]));
  }
};
