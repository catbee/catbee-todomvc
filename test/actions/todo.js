var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
var todoAction = require('../../actions/todoAction');

var Baobab = require('baobab');
var storage = require('../../services/storage');

var ServiceLocator = require('catberry-locator');

var localStorage = createLocalStorage();

var catLocator = new ServiceLocator();

catLocator.registerInstance('localStorage', localStorage);

catLocator.registerInstance('config', {});
storage.register(catLocator);

lab.experiment('todoAction.loadStorageTodos method', () => {
  let state,
    output;

  lab.beforeEach(done => {
    state = new Baobab({});
    output = {};
    done();
  });

  lab.test('Successful service answer', done => {
    localStorage.setItem('TODO_LIST', JSON.stringify({id: 'test'}));
    output = {
      success: todos => {
        assert.deepEqual(todos, {todos: {id: 'test'}});
        done();
      }
    };

    todoAction.loadStorageTodos({}, state, output, { locator: catLocator });
  });

  lab.test('Unsuccessful service answer', done => {
    localStorage.setItem('TODO_LIST', {id: 'test'});
    output = {
      success: () => {

      },
      error: ({error}) => {
        assert.equal(error instanceof Error, true);
        done();
      }
    };
    todoAction.loadStorageTodos({}, state, output, { locator: catLocator });
  });
});

lab.experiment('todoAction.setTodos method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Set empty todos', done => {
    let todos = '';
    todoAction.setTodos({todos}, state);
    assert.deepEqual(state.get(['todos']), []);
    done();
  });

  lab.test('Set few todos', done => {
    let todos = ['todo1', 'todo2'];
    todoAction.setTodos({todos}, state);
    assert.deepEqual(state.get(['todos']), todos);
    done();
  });
});

lab.experiment('todoAction.validateNewTodo method', () => {
  let state,
    output,
    value;

  lab.beforeEach(done => {
    state = new Baobab({});
    output = {};
    done();
  });

  lab.test('Successful validating', done => {
    value = [1, 2, 3];
    output = {
      success: () => {
        done();
      }
    };

    todoAction.validateNewTodo({value}, state, output);
  });

  lab.test('Unsuccessful validating', done => {
    value = [];
    output = {
      error: () => {
        done();
      }
    };

    todoAction.validateNewTodo({value}, state, output);
  });
});

lab.experiment('todoAction.addNewTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Adding one todo, asserts all properties', done => {
    let inputValue = 'test input value';
    state.set(['form', 'input'], inputValue);
    state.set(['todos'], []);

    todoAction.addNewTodo({}, state);
    assert.equal(state.get(['todos']).length, 1);
    assert.equal(state.get(['todos', 0, 'status']), 'active');
    assert.strictEqual(state.get(['todos', 0, 'shown']), true);
    assert.equal(state.get(['todos', 0, 'name']), inputValue);
    done();
  });

  lab.test('Adding three todos, asserts length', done => {
    let inputValue = 'test input value';
    state.set(['form', 'input'], inputValue);
    state.set(['todos'], []);

    todoAction.addNewTodo({}, state);
    todoAction.addNewTodo({}, state);
    todoAction.addNewTodo({}, state);
    assert.equal(state.get(['todos']).length, 3);
    done();
  });
});

lab.experiment('todoAction.removeTodo method', () => {
  let state,
    id;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Removes todo when only one todo in todos', done => {
    id = 1;
    state.set(['todos'], [ {id} ]);

    todoAction.removeTodo({id}, state);
    assert.equal(state.get(['todos']).length, 0);
    done();
  });

  lab.test('Removes todo when three todo in todos', done => {
    id = 1;
    state.set(['todos'], [ {id}, {id: 2}, {id: 3} ]);

    todoAction.removeTodo({id}, state);
    assert.equal(state.get(['todos']).length, 2);
    assert.strictEqual(!state.get(['todos', {id}]), true, 'Should be removed');
    done();
  });
});

function createLocalStorage () {
  let _storage = {};
  return {
    setItem: function (key, value) {
      _storage[key] = value || '';
    },
    getItem: function (key) {
      return _storage[key] || null;
    },
    removeItem: function (key) {
      delete _storage[key];
    },
    get length () {
      return Object.keys(_storage).length;
    },
    key: function (i) {
      var keys = Object.keys(_storage);
      return keys[i] || null;
    }
  };
}
