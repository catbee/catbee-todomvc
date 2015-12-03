var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
var counterAction = require('../../actions/counterAction.js');

var Baobab = require('baobab');

lab.experiment('setBaseCount method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({
      todos: []
    });
    counterAction.setBaseCount({}, state);
    done();
  });

  lab.test('Empty todos', done => {
    assert.equal(state.get(['counter']), 0, 'Should be zero');
    done();
  });

  lab.test('One active todo in todos', function (done) {
    state.push(['todos'], { id: +new Date(), status: 'active' });
    assert.equal(state.get(['counter']), 1);
    done();
  });

  lab.test('Two active todos in todos', function (done) {
    state.push(['todos'], { id: +new Date(), status: 'active' });
    state.push(['todos'], { id: +new Date(), status: 'active' });
    assert.equal(state.get(['counter']), 2);
    done();
  });

  lab.test('One completed todo in todos', function (done) {
    state.push(['todos'], { id: +new Date(), status: 'completed' });
    assert.equal(state.get(['counter']), 0);
    done();
  });

  lab.test('Two completed todos in todos', function (done) {
    state.push(['todos'], { id: +new Date(), status: 'completed' });
    state.push(['todos'], { id: +new Date(), status: 'completed' });
    assert.equal(state.get(['counter']), 0);
    done();
  });

  lab.test('Three active and two completed todos in todos field', function (done) {
    state.push(['todos'], { id: +new Date(), status: 'active' });
    state.push(['todos'], { id: +new Date(), status: 'active' });
    state.push(['todos'], { id: +new Date(), status: 'active' });
    state.push(['todos'], { id: +new Date(), status: 'completed' });
    state.push(['todos'], { id: +new Date(), status: 'completed' });

    assert.equal(state.get(['counter']), 3);
    done();
  });
});
