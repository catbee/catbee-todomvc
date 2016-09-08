const assert = require('assert');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Baobab = require('baobab');
const paths = require('../../src/form/paths');
const createSelf = require('../../src/self');
const { methods } = require('../../src/form/actions');

lab.experiment('form actions', () => {
  let state, self;

  lab.beforeEach((done) => {
    state = new Baobab({});
    self = createSelf(paths, state);
    done();
  });

  lab.test('initialization', (done) => {
    methods.initialize({ self });
    assert.equal(self.input(), '');
    done();
  });

  lab.test('clearInput', (done) => {
    self.input('test');
    methods.clearForm({ self });
    assert.equal(self.input(), '');
    done();
  });

  lab.test('setInputValue', (done) => {
    let value = 'Test value';
    methods.setInputValue({ args: { value }, self });
    assert.equal(self.input(), value);
    done();
  });
});
