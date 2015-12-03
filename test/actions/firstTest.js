var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
var counterAction = require('../../actions/counterAction.js');

var Baobab = require('baobab');

lab.experiment('Testing empty todos', () => {
  let state;

  lab.before(done => {
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

});

lab.experiment('Adds "active" todos to state', function () {
  let state;

  lab.before( done => {
    state = new Baobab({
      todos: []
    });
    counterAction.setBaseCount({}, state);
    done();
  });

  lab.beforeEach(function (done) {
    state.push(['todos'], { id: +new Date(), status: 'active' });
    done();
  });


  lab.test('One active todo in todos', function (done) {
    assert.equal(state.get(['counter']), 1);
    done();
  });

  lab.test('Two active todos in todos', function (done) {
    assert.equal(state.get(['counter']), 2);
    done();
  });

});

lab.experiment('Adds "active" todos to state', function () {
  let state;

  lab.before( done => {
    state = new Baobab({
      todos: []
    });
    counterAction.setBaseCount({}, state);
    done();
  });

  lab.beforeEach(function (done) {
    state.push(['todos'], { id: +new Date(), status: 'completed' });
    done();
  });


  lab.test('One completed todo in todos', function (done) {
    assert.equal(state.get(['counter']), 0);
    done();
  });

  lab.test('Two completed todos in todos', function (done) {
    assert.equal(state.get(['counter']), 0);
    done();
  });

});

lab.experiment('Shuffeled acitve and completed todos in todos baobab field', function () {
  let state;

  lab.before( done => {
    state = new Baobab({
      todos: []
    });
    counterAction.setBaseCount({}, state);
    done();
  });

  lab.beforeEach(function (done) {
    state.push(['todos'], {id: +new Date(), status: 'active'});
    state.push(['todos'], {id: +new Date(), status: 'active'});
    state.push(['todos'], {id: +new Date(), status: 'completed'});
    state.push(['todos'], {id: +new Date(), status: 'completed'});
    done();
  });


  lab.test('Six active todos in todos field', function (done) {
    assert.equal(state.get(['counter']), 2);
    done();
  });

  lab.test('Twelve active todos in todos field', function (done) {
    assert.equal(state.get(['counter']), 4);
    done();
  });

  lab.after( done => {
    state = null;
    done();
  })

});
