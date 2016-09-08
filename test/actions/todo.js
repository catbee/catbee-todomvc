const _ = require('lodash');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const assert = require('assert');
const Baobab = require('baobab');
const storage = require('../../src/services/storage');
const ServiceLocator = require('catberry-locator');
const createSelf = require('../../src/self');
const locator = new ServiceLocator();
const localStorage = createLocalStorage();

const { methods } = require('../../src/todo/actions');
const paths = require('../../src/todo/paths');
const filtersPaths = require('../../src/filters/paths');

locator.registerInstance('window', { localStorage });
locator.registerInstance('config', {});
storage.register(locator);

lab.experiment('todo', () => {
  let state, output, self;

  const todos = [
    { id: 1, status: 'active' },
    { id: 2, status: 'completed' }
  ];

  lab.beforeEach((done) => {
    state = new Baobab();
    self = createSelf(paths, state);
    self.todos(todos);
    output = {};
    done();
  });

  lab.experiment('initialization', () => {
    lab.test('empty todo list', (done) => {
      methods.initialize({ args: {}, self });
      assert.deepEqual(self.todos(), []);
      done();
    });

    lab.test('provided todo list', (done) => {
      methods.initialize({ args: { todos }, self });
      assert.deepEqual(self.todos(), todos);
      done();
    });

    lab.test('todo counter', (done) => {
      methods.initialize({ args: { todos }, self });
      assert.equal(self.counter(), 1);
      done();
    });

    lab.test('edited id', (done) => {
      methods.initialize({ args: { todos }, self });
      assert.strictEqual(self.editedId(), null);
      done();
    });

    lab.experiment('todo filter', () => {
      const withEdited = todos.map(
        (item) => _.defaults({ editing: false }, item));

      lab.beforeEach((done) => {
        methods.initialize({ args: { todos }, self });
        done();
      });

      lab.test('completed', (done) => {
        state.set(filtersPaths.isActive, 'completed');
        assert.deepEqual(self.todosComputed(), [ withEdited[1] ]);
        done();
      });

      lab.test('all', (done) => {
        state.set(filtersPaths.isActive, 'all');
        assert.deepEqual(self.todosComputed(), withEdited);
        done();
      });

      lab.test('editing todo', (done) => {
        state.set(filtersPaths.isActive, 'all');
        self.editedId(1);
        assert(self.todosComputed()[0].editing);
        done();
      });
    });

    lab.experiment('not empty status', () => {
      lab.test('empty', (done) => {
        methods.initialize({ args: {}, self });
        assert(!self.isTodosNotEmpty());
        done();
      });

      lab.test('not empty', (done) => {
        methods.initialize({ args: { todos }, self });
        assert(self.isTodosNotEmpty());
        done();
      });
    });

    lab.experiment('completion status', () => {
      lab.test('not completed', (done) => {
        methods.initialize({ args: { todos }, self });
        assert(!self.allCompleted());
        done();
      });

      lab.test('completed', (done) => {
        methods.initialize({ args: { todos: [ todos[1] ] }, self });
        assert(self.allCompleted());
        done();
      });
    });
  });

  lab.test('marking all completed', (done) => {
    methods.markAllCompleted({ self });
    const expected = [ Object.assign({}, todos[0], { status: 'completed' }), todos[1] ];
    assert.deepEqual(self.todos(), expected);
    done();
  });

  lab.test('marking all active', (done) => {
    methods.markAllActive({ self });
    const expected = [ todos[0], Object.assign({}, todos[1], { status: 'active' }) ];
    assert.deepEqual(self.todos(), expected);
    done();
  });

  lab.test('marking one todo completed', (done) => {
    methods.markOneCompleted({ args: { id: todos[0].id }, self });
    assert.equal(self.todos()[0].status, 'completed');
    done();
  });

  lab.test('marking one todo active', (done) => {
    methods.markOneActive({ args: { id: todos[1].id }, self });
    assert.equal(self.todos()[1].status, 'active');
    done();
  });

  lab.test('setting edited todo id', (done) => {
    methods.editTodo({ args: { id: 1 }, self });
    assert.equal(self.editedId(), 1);
    done();
  });

  lab.experiment('loadStorageTodos method', () => {
    const context = {
      isServer: false
    };


    lab.test('Successful service answer', (done) => {
      let todoItem = { id: 'test' };
      localStorage.setItem('TODO_LIST', JSON.stringify(todoItem));
      output = {
        success: (result) => {
          assert.deepEqual(result, { todos: todoItem });
          done();
        }
      };

      methods.loadStorageTodos({ output, locator, context });
    });

    lab.test('Unsuccessful service answer', (done) => {
      localStorage.setItem('TODO_LIST', { id: 'test' });
      output = {
        success: () => null,
        error: ({ error }) => {
          assert.equal(error instanceof Error, true);
          done();
        }
      };
      methods.loadStorageTodos({ output, locator, context });
    });

    lab.test('Empty answer on server', (done) => {
      output = {
        success: (result) => {
          assert.deepEqual(result.todos, []);
          done();
        }
      };
      methods.loadStorageTodos({ output, locator, context: { isServer: true } });
    });
  });

  lab.test('Adding one todo, asserts all properties', (done) => {
    let inputValue = 'test input value';
    self.todos([]);

    methods.addNewTodo({ args: { value: inputValue }, self });
    assert.equal(self.todos().length, 1);
    assert.equal(self.todos()[0].status, 'active');
    assert.equal(self.todos()[0].name, inputValue);
    done();
  });

  lab.test('Removes todo when only one todo in todos', (done) => {
    methods.removeTodo({ args: { id: 1 }, self });
    assert.equal(self.todos().length, 1);
    done();
  });

  lab.experiment('todo.syncTodoInStorage method', () => {
    lab.test('Successful synchronization answer', (done) => {
      self.todos([{ id: 1, name: 'test' }]);
      output = {
        success: () => {
          done();
        }
      };

      methods.syncTodoInStorage({ self, output, locator });
    });
  });

  lab.experiment('todo.saveEditingTodo method', () => {
    lab.test('Save editing todo', (done) => {
      let value = 'new name';
      let id = 1;
      self.todos([ { id: 1, name: 'test' } ]);

      methods.saveEditingTodo({ args: { value, id }, self });
      assert.strictEqual(self.todos()[0].name, value);
      done();
    });
  });

  lab.test('Cancel editing todo', (done) => {
    methods.cancelEditingTodo({ self });
    assert.equal(self.editedId(), null);
    done();
  });

  lab.experiment('removeCompletedTodos method', () => {
    lab.test('Remove all completed', (done) => {
      self.todos([
        { status: 'completed' },
        { status: 'completed' }
      ]);

      methods.removeCompletedTodos({ self });
      assert.deepEqual(self.todos(), []);
      done();
    });

    lab.test('Remove one completed and leave active', (done) => {
      self.todos([
        { status: 'completed' },
        { status: 'active' }
      ]);

      methods.removeCompletedTodos({ self });
      assert.deepEqual(self.todos(), [ { status: 'active' } ]);
      done();
    });
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
      const keys = Object.keys(_storage);
      return keys[i] || null;
    }
  };
}
