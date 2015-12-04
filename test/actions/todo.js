var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
var todoAction = require('../../actions/todoAction');

var Baobab = require('baobab');
var storage = require('../../services/storage');

var ServiceLocator = require('catberry-locator');

var localStorage = createLocalStorage();

var catLocator = new ServiceLocator();

catLocator.registerInstance('window', { localStorage: localStorage });

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
    let todo = {id: 'test'};
    localStorage.setItem('TODO_LIST', JSON.stringify(todo));
    output = {
      success: todos => {
        assert.deepEqual(todos, {todos: todo});
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

lab.experiment('todoAction.syncTodoInStorage method', () => {
  let state,
    output;

  lab.beforeEach(done => {
    state = new Baobab({});
    output = {};
    done();
  });

  lab.test('Successful synchronization answer', done => {
    state.set(['todos'], [{id: 1, name: 'test'}]);
    output = {
      success: () => {
        done();
      }
    };

    todoAction.syncTodoInStorage({}, state, output, { locator: catLocator });
  });
});

lab.experiment('todoAction.setTodosIdsMap method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('No todos items', done => {
    todoAction.setTodosIdsMap({}, state);
    state.set(['todos'], []);
    assert.equal(state.get(['todoIds']).length, 0);
    done();
  });

  lab.test('Two todos items', done => {
    todoAction.setTodosIdsMap({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id: 11});
    assert.equal(state.get(['todoIds']).length, 1);

    state.push(['todos'], {id: 22});
    assert.equal(state.get(['todoIds']).length, 2);
    done();
  });
});

lab.experiment('todoAction.setSyncFlag method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Sets sync flag', done => {
    todoAction.setSyncFlag({}, state);
    assert.strictEqual(state.get(['isSyncing']), true);
    done();
  });
});

lab.experiment('todoAction.removeSyncFlag method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Removes sync flag', done => {
    todoAction.removeSyncFlag({}, state);
    assert.strictEqual(state.get(['isSyncing']), false);
    done();
  });
});

lab.experiment('todoAction.clearForm method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Clears input', done => {
    state.set(['form', 'input'], 'test');
    todoAction.clearForm({}, state);
    assert.strictEqual(state.get(['form', 'input']), undefined);
    done();
  });
});

lab.experiment('todoAction.setTodosStateFlag method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('There are no todo items', done => {
    todoAction.setTodosStateFlag({}, state);

    state.set(['todos'], []);
    assert.strictEqual(state.get(['isTodosNotEmpty']), false);
    done();
  });

  lab.test('There is one todo item', done => {
    todoAction.setTodosStateFlag({}, state);

    state.set(['todos'], [{id:1}]);
    assert.strictEqual(state.get(['isTodosNotEmpty']), true);
    done();
  });

  lab.test('There are two todos', done => {
    todoAction.setTodosStateFlag({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id:1});
    assert.strictEqual(state.get(['isTodosNotEmpty']), true);

    state.unset(['todos', 0]);
    assert.strictEqual(state.get(['isTodosNotEmpty']), false);
    done();
  });
});

lab.experiment('todoAction.setCompletedAllStateFlag method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('There are no todo items', done => {
    todoAction.setCompletedAllStateFlag({}, state);
    state.set(['todos'], []);
    assert.strictEqual(state.get(['allCompleted']), false);
    done();
  });

  lab.test('Adding completed todo', done => {
    todoAction.setCompletedAllStateFlag({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id:1, status: 'completed'});
    assert.strictEqual(state.get(['allCompleted']), true);

    state.push(['todos'], {id:2, status: 'completed'});
    assert.strictEqual(state.get(['allCompleted']), true);
    done();
  });

  lab.test('Adding active todo', done => {
    todoAction.setCompletedAllStateFlag({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id:1, status: 'active'});
    assert.strictEqual(state.get(['allCompleted']), false);

    state.push(['todos'], {id:2, status: 'active'});
    assert.strictEqual(state.get(['allCompleted']), false);
    done();
  });

  lab.test('Adding active and completed todo', done => {
    todoAction.setCompletedAllStateFlag({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id:1, status: 'completed'});
    assert.strictEqual(state.get(['allCompleted']), true);

    state.push(['todos'], {id:2, status: 'active'});
    assert.strictEqual(state.get(['allCompleted']), false);
    done();
  });
});

lab.experiment('todoAction.saveEditingTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Save editing todo', done => {
    let value = 'new name';
    let id = 1;
    state.set(['todos'], [{id: 1, name: 'test'}]);

    todoAction.saveEditingTodo({value, id}, state);
    assert.strictEqual(state.get(['todos', 0, 'name']), value);
    done();
  });
});

lab.experiment('todoAction.cancelEditingTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Cancel editing todo', done => {
    state.set(['todos'], []);
    state.push(['todos'], {editing: true});
    state.push(['todos'], {editing: false});

    todoAction.cancelEditingTodo({}, state);
    assert.strictEqual(state.get(['todos', 0, 'editing']), false);
    assert.strictEqual(state.get(['todos', 1, 'editing']), false);
    done();
  });
});

lab.experiment('todoAction.toggleCompletedTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Toggle to complete', done => {
    let id = 1;
    state.set(['todos'], [{id:1, status: 'active', checked: false}]);

    todoAction.toggleCompletedTodo({id}, state);
    assert.equal(state.get(['todos', 0, 'status']), 'completed');
    assert.equal(state.get(['todos', 0, 'checked']), true);
    done();
  });

  lab.test('Toggle to not complete', done => {
    let id = 1;
    state.set(['todos'], [{id:1, status: 'completed', checked: true}]);

    todoAction.toggleCompletedTodo({id}, state);
    assert.equal(state.get(['todos', 0, 'status']), 'active');
    assert.equal(state.get(['todos', 0, 'checked']), false);
    done();
  });
});

lab.experiment('todoAction.toggleAllCompletedTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Toggle to complete', done => {
    let isCompleted = true;
    state.set(['todos'], [
      {status: 'active', checked: false},
      {status: 'active', checked: false}
    ]);

    todoAction.toggleAllCompletedTodo({isCompleted}, state);
    assert.equal(state.get(['todos', 0, 'status']), 'completed');
    assert.equal(state.get(['todos', 0, 'checked']), true);
    assert.equal(state.get(['todos', 1, 'status']), 'completed');
    assert.equal(state.get(['todos', 1, 'checked']), true);
    done();
  });

  lab.test('Toggle to not complete', done => {
    let isCompleted = false;
    state.set(['todos'], [
      {status: 'completed', checked: true},
      {status: 'completed', checked: true}
    ]);

    todoAction.toggleAllCompletedTodo({isCompleted}, state);
    assert.equal(state.get(['todos', 0, 'status']), 'active');
    assert.equal(state.get(['todos', 0, 'checked']), false);
    assert.equal(state.get(['todos', 1, 'status']), 'active');
    assert.equal(state.get(['todos', 1, 'checked']), false);
    done();
  });
});

lab.experiment('todoAction.removeCompletedTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Remove all completed', done => {
    state.set(['todos'], [
      {status: 'completed'},
      {status: 'completed'}
    ]);

    todoAction.removeCompletedTodo({}, state);
    assert.equal(state.get(['todos'].length, 0));
    done();
  });

  lab.test('Remove one completed and leave active', done => {
    state.set(['todos'], [
      {status: 'completed'},
      {status: 'active'}
    ]);

    todoAction.removeCompletedTodo({}, state);
    assert.equal(state.get(['todos'].length, 1));
    done();
  });
});

lab.experiment('todoAction.setComputedTodos method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({todos: []});
    done();
  });

  lab.test('Filter "all" add active todo', done => {
    todoAction.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'all');
    state.push(['todos'], {status: 'active'});
    assert.equal(state.get(['todosComputed']).length, 1, 'Should be one item');
    assert.equal(state.get(['todosComputed', 0, 'status']), 'active');
    assert.equal(state.get(['todosComputed', 0, 'shown']), true);
    done();
  });

  lab.test('Filter "all" add completed todo', done => {
    todoAction.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'all');
    state.push(['todos'], {status: 'completed'});
    assert.equal(state.get(['todosComputed']).length, 1, 'Should be one item');
    assert.equal(state.get(['todosComputed', 0, 'status']), 'completed');
    assert.equal(state.get(['todosComputed', 0, 'shown']), true);
    done();
  });

  lab.test('Filter "active" add active todo', done => {
    todoAction.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'active');
    state.push(['todos'], {status: 'active'});
    assert.equal(state.get(['todosComputed']).length, 1, 'Should be one item');
    assert.equal(state.get(['todosComputed', 0, 'status']), 'active');
    assert.equal(state.get(['todosComputed', 0, 'shown']), true);
    done();
  });

  lab.test('Filter "active" add completed todo', done => {
    todoAction.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'active');
    state.push(['todos'], {status: 'completed'});
    assert.equal(state.get(['todosComputed']).length, 1, 'Should be one item');
    assert.equal(state.get(['todosComputed', 0, 'status']), 'completed');
    assert.equal(state.get(['todosComputed', 0, 'shown']), false);
    done();
  });

  lab.test('Filter "completed" add active todo', done => {
    todoAction.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'completed');
    state.push(['todos'], {status: 'active'});
    assert.equal(state.get(['todosComputed']).length, 1, 'Should be one item');
    assert.equal(state.get(['todosComputed', 0, 'status']), 'active');
    assert.equal(state.get(['todosComputed', 0, 'shown']), false);
    done();
  });

  lab.test('Filter "completed" add completed todo', done => {
    todoAction.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'completed');
    state.push(['todos'], {status: 'completed'});
    assert.equal(state.get(['todosComputed']).length, 1, 'Should be one item');
    assert.equal(state.get(['todosComputed', 0, 'status']), 'completed');
    assert.equal(state.get(['todosComputed', 0, 'shown']), true);
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
