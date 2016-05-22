var DELAY = 250;

class Storage {
  constructor ($window) {
    this._window = $window;

    if (this._window) {
      this.localStorage = this._window.localStorage;
    }
  }

  getByKey (key) {
    return new Promise((resolve, reject) => {
      if (!this.localStorage) {
        resolve();
        return;
      }

      setTimeout(() => {
        var value = this.localStorage.getItem(key);

        try {
          value = JSON.parse(value);
        } catch (e) {
          reject(e);
        }

        resolve(value);
      }, DELAY);
    });
  }

  setByKey (key, value) {
    return new Promise((resolve) => {
      if (!this.localStorage) {
        resolve();
        return;
      }

      setTimeout(() => {
        this.localStorage.setItem(key, JSON.stringify(value));
        resolve();
      }, DELAY);
    });
  }

  clearByKey(key, todoId) {
    return new Promise((resolve) => {
      if (!this.localStorage) {
        resolve();
        return;
      }

      setTimeout(() => {
        let updatedStor = JSON.parse(this.localStorage.getItem(key));
        updatedStor.splice(todoId,1);
        this.localStorage.setItem(key, updatedStor);
        resolve();
      }, DELAY);
    });
  }
}

module.exports = {
  register (locator) {
    var config = locator.resolve('config');
    locator.register('storage', Storage, true);
  }
};
