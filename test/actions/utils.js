var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
var utilsAction = require('../../actions/utilsAction');

var Baobab = require('baobab');

lab.experiment('utilsAction.setInputValue method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Set one test path and value', done => {
    let path = 'form.input';
    let value = 'Test value';
    utilsAction.setInputValue({path, value}, state);
    assert.equal(state.get(['form', 'input']), value);
    done();
  });

  lab.test('Set second test path and value', done => {
    let path = 'form.field.one';
    let value = '';
    utilsAction.setInputValue({path, value}, state);
    assert.equal(state.get(['form', 'field', 'one']), value);
    done();
  });
});
