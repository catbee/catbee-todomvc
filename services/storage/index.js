var DELAY = 250;

class Storage {
  getByKey (key) {
    return new Promise((resolve, reject) => {
      if (!global.localStorage) {
        resolve();
        return;
      }

      setTimeout(() => {
        var value = localStorage.getItem(key);

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
      if (!global.localStorage) {
        resolve();
        return;
      }

      setTimeout(() => {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      }, DELAY);
    });
  }

  clearByKey(key, todoId) {
    return new Promise((resolve) => {
      if (!global.localStorage) {
        resolve();
        return;
      }

      setTimeout(() => {
        let updatedStor = JSON.parse(localStorage.getItem(key));
        updatedStor.splice(todoId,1);
        localStorage.setItem(key, updatedStor);
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
