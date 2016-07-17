const Lab = require('lab');
const lab = exports.lab = Lab.script();
const assert = require('assert');
const todo = require('../../actions/todo');
const Baobab = require('baobab');
const storage = require('../../services/storage');
const ServiceLocator = require('catberry-locator');
const locator = new ServiceLocator();
const localStorage = createLocalStorage();

locator.registerInstance('window', { localStorage });
locator.registerInstance('config', {});
storage.register(locator);

lab.experiment('todo.loadStorageTodos method', () => {
  let state, output;

  lab.beforeEach(done => {
    state = new Baobab({});
    output = {};
    done();
  });

  lab.test('Successful service answer', done => {
    let todoItem = { id: 'test' };
    localStorage.setItem('TODO_LIST', JSON.stringify(todoItem));
    output = {
      success: todos => {
        assert.deepEqual(todos, { todos: todoItem });
        done();
      }
    };

    todo.loadStorageTodos({}, state, output, { locator: locator });
  });

  lab.test('Unsuccessful service answer', done => {
    localStorage.setItem('TODO_LIST', { id: 'test' });
    output = {
      success: () => {

      },
      error: ({error}) => {
        assert.equal(error instanceof Error, true);
        done();
      }
    };
    todo.loadStorageTodos({}, state, output, { locator: locator });
  });
});

lab.experiment('todo.setTodos method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Set empty todos', done => {
    let todos = '';
    todo.setTodos({todos}, state);
    assert.deepEqual(state.get(['todos']), []);
    done();
  });

  lab.test('Set few todos', done => {
    let todos = ['todo1', 'todo2'];
    todo.setTodos({todos}, state);
    assert.deepEqual(state.get(['todos']), todos);
    done();
  });
});

lab.experiment('todo.validateNewTodo method', () => {
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

    todo.validateNewTodo({value}, state, output);
  });

  lab.test('Unsuccessful validating', done => {
    value = [];
    output = {
      error: () => {
        done();
      }
    };

    todo.validateNewTodo({value}, state, output);
  });
});

lab.experiment('todo.addNewTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Adding one todo, asserts all properties', done => {
    let inputValue = 'test input value';
    state.set(['form', 'input'], inputValue);
    state.set(['todos'], []);

    todo.addNewTodo({}, state);
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

    todo.addNewTodo({}, state);
    todo.addNewTodo({}, state);
    todo.addNewTodo({}, state);
    assert.equal(state.get(['todos']).length, 3);
    done();
  });
});

lab.experiment('todo.removeTodo method', () => {
  let state,
    id;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Removes todo when only one todo in todos', done => {
    id = 1;
    state.set(['todos'], [ {id} ]);

    todo.removeTodo({id}, state);
    assert.equal(state.get(['todos']).length, 0);
    done();
  });

  lab.test('Removes todo when three todo in todos', done => {
    id = 1;
    state.set(['todos'], [ {id}, {id: 2}, {id: 3} ]);

    todo.removeTodo({id}, state);
    assert.equal(state.get(['todos']).length, 2);
    assert.strictEqual(!state.get(['todos', {id}]), true, 'Should be removed');
    done();
  });
});

lab.experiment('todo.syncTodoInStorage method', () => {
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

    todo.syncTodoInStorage({}, state, output, { locator: locator });
  });
});

lab.experiment('todo.setTodosIdsMap method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('No todos items', done => {
    todo.setTodosIdsMap({}, state);
    state.set(['todos'], []);
    assert.equal(state.get(['todoIds']).length, 0);
    done();
  });

  lab.test('Two todos items', done => {
    todo.setTodosIdsMap({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id: 11});
    assert.equal(state.get(['todoIds']).length, 1);

    state.push(['todos'], {id: 22});
    assert.equal(state.get(['todoIds']).length, 2);
    done();
  });
});

lab.experiment('todo.setSyncFlag method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Sets sync flag', done => {
    todo.setSyncFlag({}, state);
    assert.strictEqual(state.get(['isSyncing']), true);
    done();
  });
});

lab.experiment('todo.removeSyncFlag method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Removes sync flag', done => {
    todo.removeSyncFlag({}, state);
    assert.strictEqual(state.get(['isSyncing']), false);
    done();
  });
});

lab.experiment('todo.clearForm method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Clears input', done => {
    state.set(['form', 'input'], 'test');
    todo.clearForm({}, state);
    assert.strictEqual(typeof state.get(['form', 'input']), 'undefined');
    done();
  });
});

lab.experiment('todo.setTodosStateFlag method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('There are no todo items', done => {
    todo.setTodosStateFlag({}, state);

    state.set(['todos'], []);
    assert.strictEqual(state.get(['isTodosNotEmpty']), false);
    done();
  });

  lab.test('There is one todo item', done => {
    todo.setTodosStateFlag({}, state);

    state.set(['todos'], [{id: 1}]);
    assert.strictEqual(state.get(['isTodosNotEmpty']), true);
    done();
  });

  lab.test('There are two todos', done => {
    todo.setTodosStateFlag({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id: 1});
    assert.strictEqual(state.get(['isTodosNotEmpty']), true);

    state.unset(['todos', 0]);
    assert.strictEqual(state.get(['isTodosNotEmpty']), false);
    done();
  });
});

lab.experiment('todo.setCompletedAllStateFlag method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('There are no todo items', done => {
    todo.setCompletedAllStateFlag({}, state);
    state.set(['todos'], []);
    assert.strictEqual(state.get(['allCompleted']), false);
    done();
  });

  lab.test('Adding completed todo', done => {
    todo.setCompletedAllStateFlag({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id: 1, status: 'completed'});
    assert.strictEqual(state.get(['allCompleted']), true);

    state.push(['todos'], {id: 2, status: 'completed'});
    assert.strictEqual(state.get(['allCompleted']), true);
    done();
  });

  lab.test('Adding active todo', done => {
    todo.setCompletedAllStateFlag({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id: 1, status: 'active'});
    assert.strictEqual(state.get(['allCompleted']), false);

    state.push(['todos'], {id: 2, status: 'active'});
    assert.strictEqual(state.get(['allCompleted']), false);
    done();
  });

  lab.test('Adding active and completed todo', done => {
    todo.setCompletedAllStateFlag({}, state);

    state.set(['todos'], []);
    state.push(['todos'], {id: 1, status: 'completed'});
    assert.strictEqual(state.get(['allCompleted']), true);

    state.push(['todos'], {id: 2, status: 'active'});
    assert.strictEqual(state.get(['allCompleted']), false);
    done();
  });
});

lab.experiment('todo.saveEditingTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Save editing todo', done => {
    let value = 'new name';
    let id = 1;
    state.set(['todos'], [{id: 1, name: 'test'}]);

    todo.saveEditingTodo({value, id}, state);
    assert.strictEqual(state.get(['todos', 0, 'name']), value);
    done();
  });
});

lab.experiment('todo.cancelEditingTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Cancel editing todo', done => {
    state.set(['todos'], []);
    state.push(['todos'], {editing: true});
    state.push(['todos'], {editing: false});

    todo.cancelEditingTodo({}, state);
    assert.strictEqual(state.get(['todos', 0, 'editing']), false);
    assert.strictEqual(state.get(['todos', 1, 'editing']), false);
    done();
  });
});

lab.experiment('todo.toggleCompletedTodo method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Toggle to complete', done => {
    let id = 1;
    state.set(['todos'], [{id: 1, status: 'active', checked: false}]);

    todo.toggleCompletedTodo({id}, state);
    assert.deepEqual(state.get(['todos']), [{id: 1, status: 'completed', checked: true}]);
    done();
  });

  lab.test('Toggle to not complete', done => {
    let id = 1;
    state.set(['todos'], [{id: 1, status: 'completed', checked: true}]);

    todo.toggleCompletedTodo({id}, state);
    assert.deepEqual(state.get(['todos']), [{id: 1, status: 'active', checked: false}]);
    done();
  });
});

lab.experiment('todo.toggleAllCompletedTodo method', () => {
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

    todo.toggleAllCompletedTodo({isCompleted}, state);
    assert.deepEqual(state.get(['todos']), [
      {status: 'completed', checked: true},
      {status: 'completed', checked: true}
    ]);
    done();
  });

  lab.test('Toggle to not complete', done => {
    let isCompleted = false;
    state.set(['todos'], [
      {status: 'completed', checked: true},
      {status: 'completed', checked: true}
    ]);

    todo.toggleAllCompletedTodo({isCompleted}, state);
    assert.deepEqual(state.get(['todos']), [
      {status: 'active', checked: false},
      {status: 'active', checked: false}
    ]);
    done();
  });
});

lab.experiment('todo.removeCompletedTodo method', () => {
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

    todo.removeCompletedTodo({}, state);
    assert.equal(state.get(['todos'].length, 0));
    done();
  });

  lab.test('Remove one completed and leave active', done => {
    state.set(['todos'], [
      {status: 'completed'},
      {status: 'active'}
    ]);

    todo.removeCompletedTodo({}, state);
    assert.equal(state.get(['todos'].length, 1));
    done();
  });
});

lab.experiment('todo.setComputedTodos method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({todos: []});
    done();
  });

  lab.test('Filter "all" add active todo', done => {
    todo.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'all');
    state.push(['todos'], {status: 'active'});
    assert.deepEqual(state.get(['todosComputed']), [{status: 'active', shown: true}]);
    done();
  });

  lab.test('Filter "all" add completed todo', done => {
    todo.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'all');
    state.push(['todos'], {status: 'completed'});
    assert.deepEqual(state.get(['todosComputed']), [{status: 'completed', shown: true}]);
    done();
  });

  lab.test('Filter "active" add active todo', done => {
    todo.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'active');
    state.push(['todos'], {status: 'active'});
    assert.deepEqual(state.get(['todosComputed']), [{status: 'active', shown: true}]);
    done();
  });

  lab.test('Filter "active" add completed todo', done => {
    todo.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'active');
    state.push(['todos'], {status: 'completed'});
    assert.deepEqual(state.get(['todosComputed']), [{status: 'completed', shown: false}]);
    done();
  });

  lab.test('Filter "completed" add active todo', done => {
    todo.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'completed');
    state.push(['todos'], {status: 'active'});
    assert.deepEqual(state.get(['todosComputed']), [{status: 'active', shown: false}]);
    done();
  });

  lab.test('Filter "completed" add completed todo', done => {
    todo.setComputedTodos({}, state);
    state.set(['filters', 'isActive'], 'completed');
    state.push(['todos'], {status: 'completed'});
    assert.deepEqual(state.get(['todosComputed']), [{status: 'completed', shown: true}]);
    done();
  });
});

function createLocalStorage () {
  let _storage = {};
  return {
    setItem: function setItem (key, value) {
      _storage[key] = value || '';
    },
    getItem: function getItem (key) {
      return _storage[key] || null;
    },
    removeItem: function removeItem (key) {
      delete _storage[key];
    },
    get length () {
      return Object.keys(_storage).length;
    },
    key: function key (i) {
      var keys = Object.keys(_storage);
      return keys[i] || null;
    }
  };
}
