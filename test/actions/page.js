const Lab = require('lab');
const lab = exports.lab = Lab.script();
const assert = require('assert');
const { methods } = require('../../src/page/actions');
const paths = require('../../src/page/paths');
const createSelf = require('../../src/self');

const Baobab = require('baobab');

lab.experiment('page actions', () => {
  let state, self;

  lab.beforeEach((done) => {
    state = new Baobab({});
    self = createSelf(paths, state);
    done();
  });

  lab.experiment('initialization', () => {
    lab.test('title', (done) => {
      methods.initialize({ self });
      assert.equal(self.title(), 'TodoMVC');
      done();
    });

    lab.test('header', (done) => {
      methods.initialize({ self });
      assert.equal(self.header(), 'todos');
      done();
    });
  });
});
