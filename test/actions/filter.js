var Lab = require('lab');
var lab = exports.lab = Lab.script();
var assert = require('assert');
var Baobab = require('baobab');

var filterAction = require('../../actions/filtersAction');

const FILTERS_LIST = [
  { name: 'all' },
  { name: 'active' },
  { name: 'completed'}
];

lab.experiment('filtersAction.setFiltersList method', () => {
  let state = new Baobab({});

  lab.test('Setting filters', done => {
    filterAction.setFiltersList({}, state);

    assert.deepEqual(state.get(['filters', 'list']), FILTERS_LIST);
    done();
  });
});

lab.experiment('filtersAction.setActiveFilter method', () => {
  let state;

  lab.beforeEach(done => {
    state = new Baobab({});
    done();
  });

  lab.test('Setting filters', done => {
    filterAction.setFiltersList({}, state);

    assert.deepEqual(state.get(['filters', 'list']), FILTERS_LIST);
    done();
  });

  lab.test('Set active filter "all"', done => {
    state.set(['filters', 'list'], FILTERS_LIST);
    filterAction.setActiveFilter({index: 0}, state);

    assert.equal(state.get(['filters', 'isActive']), FILTERS_LIST[0].name);
    done();
  });

  lab.test('Set active filter "active"', done => {
    state.set(['filters', 'list'], FILTERS_LIST);
    filterAction.setActiveFilter({index: 1}, state);

    assert.equal(state.get(['filters', 'isActive']), FILTERS_LIST[1].name);
    done();
  });

  lab.test('Set active filter "completed"', done => {
    state.set(['filters', 'list'], FILTERS_LIST);
    filterAction.setActiveFilter({index: 2}, state);

    assert.equal(state.get(['filters', 'isActive']), FILTERS_LIST[2].name);
    done();
  });
});
