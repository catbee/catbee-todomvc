const Lab = require('lab');
const lab = exports.lab = Lab.script();
const assert = require('assert');
const Baobab = require('baobab');
const { methods } = require('../../src/filters/actions');
const paths = require('../../src/filters/paths');
const createSelf = require('../../src/self');


const FILTERS_LIST = [
  { name: 'all' },
  { name: 'active' },
  { name: 'completed' }
];

lab.experiment('filters', () => {
  let state, self;

  lab.beforeEach((done) => {
    state = new Baobab({});
    self = createSelf(paths, state);
    done();
  });

  lab.experiment('initialize method', () => {
    lab.test('Setting filters', (done) => {
      methods.initialize({ self });
      assert.deepEqual(self.list(), FILTERS_LIST);
      done();
    });

    lab.test('active filter', (done) => {
      methods.initialize({ self });
      assert.deepEqual(self.isActive(), 'all');
      done();
    });
  });

  lab.experiment('enabling different modes', () => {
    lab.test('active', (done) => {
      methods.enableActiveFilter({ self });
      assert.equal(self.isActive(), 'active');
      done();
    });

    lab.test('all', (done) => {
      methods.enableAllFilter({ self });
      assert.equal(self.isActive(), 'all');
      done();
    });

    lab.test('completed', (done) => {
      methods.enableCompletedFilter({ self });
      assert.equal(self.isActive(), 'completed');
      done();
    });
  });
});
