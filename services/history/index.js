var _ = require('lodash');

var header = `
  border-left: 6px solid gold;
  font-weight: bold;
  font-family: Helvetica;
  font-size: 16px;
  line-height: 30px;
  display: block;
  padding-left: 8px;
`;

var sub = `
  font-family: Helvetica;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
`;

var dump = `
  font-family: Helvetica;
  font-size: 13px;
  line-height: 18px;
`;

var group = `
  font-family: Helvetica;
  font-size: 14px;
  line-height: 28px;
  font-weight: normal;
  border-left: 6px solid royalblue;
  padding-left: 8px;
  color: #333;
`;

var action = `
  font-family: Helvetica;
  font-size: 14px;
  line-height: 34px;
  font-weight: normal;
  background: #F5F5F5;
  border: 1px solid #CCCCCC;
  color: #000;
  padding: 4px 10px;
`;

class History {
  constructor ($eventBus, $serviceLocator, $logger) {
    this._eventBus = $eventBus;
    this._locator = $serviceLocator;
    this._logger = $logger;
    this._history = [];

    this._eventBus.on('signalEnd', (result) => this._history.push(result));
  }

  /**
   * Signals history
   * @type {Array}
   * @private
   */
  _history = null;

  /**
   * Locator
   * @type {Object}
   * @private
   */
  _locator = null;

  /**
   * Log tree state
   */
  logTree () {
    var tree = this._getTree();
    var data = tree.get();

    console.clear();

    console.log('%cCurrent state:', header);
    console.info(data);
  }

  /**
   * Log latest mutations
   */
  logMutation () {
    var last = _.last(this._history);
    var size = _.size(this._history);

    console.clear();

    console.log(`%cSignal "${last.name}" (${size} of ${size})`, header);
    console.log(`%cSignal run with next args:`, header);
    console.log('%c%s', dump, JSON.stringify(last.args, null, 4));

    console.log('%cSignal actions:', header);

    _.each(last.branches, (branch, index, list) => {
      var size = _.size(list);
      var isAsync = _.isArray(branch);

      if (isAsync) {
        console.log(`%cAsync actions debug current not supported! Sorry! (${index + 1} of ${size})`, action);
      } else {
        console.log(`%cAction: ${branch.name} (${index + 1} of ${size})`, action);

        _.each(branch.mutations, (mutation) => {
          var name = _.capitalize(mutation.name);
          var path = mutation.path.join('.');
          var args = _.first(mutation.args);

          console.groupCollapsed(`%c${name}`, group);
          console.log(`%cPath: %c ${path}`, dump, sub);
          console.log(`%cValue: %c %o`, dump, sub, args);
          console.groupEnd();
        });
      }
    });
  }

  /**
   * Get state tree instance
   * @private
   */
  _getTree () {
    var renderer = this._locator.resolve('documentRenderer');
    return renderer._state._tree;
  }
}

module.exports = {
  register (locator) {
    var history = locator.resolveInstance(History);
    locator.registerInstance('history', history);
  }
};