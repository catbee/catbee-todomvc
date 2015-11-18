var DELAY = 250;

class Storage {
  getByKey (key) {
    return new Promise((resolve) => {
      setTimeout(() => {
        var value = localStorage.getItem(key);
        resolve(value);
      }, DELAY);
    });
  }

  setByKey (key, value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(key, value);
        resolve();
      }, DELAY);
    });
  }
}

module.exports = {
  register (locator) {
    var config = locator.resolve('config');
    locator.register('storage', Storage, config, true);
  }
};
