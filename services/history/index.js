var _ = require('lodash');
var styles = require('./styles');

class History {
  constructor ($eventBus, $serviceLocator, $logger, $window) {
    this._eventBus = $eventBus;
    this._locator = $serviceLocator;
    this._logger = $logger;
    this._history = [];
    this._clear = true;
    this._tracking = true;

    this._eventBus.on('signalEnd', (result) => this._remember(result));
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
   * Clear console on any action
   * @type {Boolean}
   * @private
   */
  _clear = true;

  /**
   * Start position of debugger
   * @type {number}
   * @private
   */
  _currentIndex = 0;

  /**
   * Track (or not) new signals
   * @type {boolean}
   * @private
   */
  _tracking = true;

  /**
   * Log tree state
   */
  logTree () {
    var tree = this._getTree();
    var data = tree.get();

    if (this._clear) {
      console.clear();
    }

    console.log('%cCurrent state:', styles.header);
    console.info(data);
  }

  /**
   * Log current signal
   */
  logSignal () {
    if (this._clear) {
      console.clear();
    }

    var signal = this._history[this._currentIndex];
    var size = Object.keys(this._history).length;

    console.log(`%cSignal "${signal.name}" (${this._currentIndex + 1} of ${size})`, styles.header);
    this._logArgs(signal);
    console.log('%cSignal actions:', styles.header);

    signal.branches.forEach((branch) => {
      var isAsync = Array.isArray(branch);

      if (isAsync) {
        branch.forEach((asyncBranch) => {
          this._logBranch(asyncBranch);
        });
      } else {
        this._logBranch(branch);
      }
    });
  }

  /**
   * Log next signal and set step index
   */
  goNextSignal () {
    var size = Object.keys(this._history).length;
    var current = this._currentIndex;

    if (current + 1 >= size) {
      this.logSignal();
      return;
    }

    this._currentIndex += 1;
    this.logSignal();
  }

  /**
   * Log previous signal and set step index
   */
  goPreviousSignal () {
    var current = this._currentIndex;

    if (current <= 0) {
      this.logSignal();
      return;
    }

    this._currentIndex -= 1;
    this.logSignal();
  }

  /**
   * Log signal args
   * @param {Object} signal
   * @private
   */
  _logArgs (signal) {
    console.log(`%cSignal run with next args:`, styles.header);
    console.info(signal.args);
  }

  /**
   * Log branch
   * @param {Object} branch
   * @private
   */
  _logBranch (branch) {
    if (branch.outputPath) {
      console.groupCollapsed(`%c${branch.name} · %cOutput to "${branch.outputPath}"`, styles.action, styles.output);
    } else {
      console.log(`%c${branch.name}`, styles.action);
    }

    _.each(branch.mutations, (mutation) => {
      var name = _.capitalize(mutation.name);
      var path = mutation.path.join('.');
      var args = _.first(mutation.args);

      console.log(`%c${name} · ${path} · %c%o`, styles.group, styles.sub, args);
    });

    if (branch.outputPath) {
      var output = branch.outputs[branch.outputPath];
      output.forEach((outputBranch) => {
        var isAsync = Array.isArray(outputBranch);

        if (isAsync) {
          outputBranch.forEach((asyncBranch) => {
            this._logBranch(asyncBranch);
          });
        } else {
          this._logBranch(outputBranch);
        }
      });

      console.groupEnd();
    }
  }

  /**
   * Get state tree instance
   * @return {Baobab}
   * @private
   */
  _getTree () {
    var renderer = this._locator.resolve('documentRenderer');
    return renderer._state._tree;
  }

  /**
   * Save history
   * @param {Object} result
   * @private
   */
  _remember (result) {
    this._history.push(result);

    if (this._tracking) {
      this._currentIndex = Object.keys(this._history).length - 1;
    }

    this.logSignal();
  }
}

module.exports = {
  register (locator) {
    var history = locator.resolveInstance(History);
    locator.registerInstance('history', history);
  }
};
