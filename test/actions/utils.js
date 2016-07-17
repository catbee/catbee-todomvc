const Lab = require('lab');
const lab = exports.lab = Lab.script();
const assert = require('assert');
const utils = require('../../actions/utils');
const Baobab = require('baobab');

lab.experiment('utils.setInputValue method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Set one test path and value', done => {
    let path = ['form', 'input'];
    let value = 'Test value';
    utils.setInputValue({path, value}, state);
    assert.equal(state.get(['form', 'input']), value);
    done();
  });

  lab.test('Set second test path and value', done => {
    let path = ['form', 'field', 'one'];
    let value = '';
    utils.setInputValue({path, value}, state);
    assert.equal(state.get(['form', 'field', 'one']), value);
    done();
  });
});
