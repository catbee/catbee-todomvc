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
    state.push(['todos'], createTodoItem());
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
    state.push(['todos'], createTodoItem('completed'));
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
    createTodosWithRandomOrder(6, 5).map(todo => {
      state.push(['todos'], todo);
    });
    done();
  });


  lab.test('Six active todos in todos field', function (done) {
    assert.equal(state.get(['counter']), 6);
    done();
  });

  lab.test('Twelve active todos in todos field', function (done) {
    assert.equal(state.get(['counter']), 12);
    done();
  });

  lab.after( done => {
    state = null;
    done();
  })

});

function createTodoItem( status ) {
  let todoStatus = status || 'active';
  return {id: (+new Date() + Math.floor(Math.random() * 999999)), status: todoStatus};
}

function createTodosWithRandomOrder(countActive, countCompleted) {
  let todos = [];

  for (let i=0; i < countActive; i++) {
    todos.push(createTodoItem());
  }
  for (let i=0; i < countCompleted; i++) {
    todos.push(createTodoItem('completed'));
  }

  shuffle(todos);

  return todos;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}