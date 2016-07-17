const Lab = require('lab');
const lab = exports.lab = Lab.script();
const assert = require('assert');
const statementsAction = require('../../actions/statements');

const Baobab = require('baobab');

lab.experiment('statementsAction.setTitle method', () => {
  let state;

  lab.test('Set title', done => {
    state = new Baobab({});
    statementsAction.setTitle({}, state);
    assert.equal(state.get(['statements', 'title']), 'TodoMVC');
    done();
  });
});

lab.experiment('statementsAction.setHeader method', () => {
  let state;

  lab.test('Set header', done => {
    state = new Baobab({});
    statementsAction.setHeader({}, state);
    assert.equal(state.get(['statements', 'header']), 'todos');
    done();
  });
});
