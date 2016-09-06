const _ = require('lodash');

module.exports = function createSelf (paths, state) {
  return Object.keys(paths).reduce(
    (self, key) => {
      const path = paths[key];
      self[key] = (value) => {
        if (_.isUndefined(value)) {
          return state.get(path);
        }
        state.set(path, value);
      };

      self[key].findOne = (query) => {
        const queryPath = path.concat(query);
        return {
          update (update) {
            state.set(queryPath, _.defaults(
              update,
              state.get(queryPath)));
          },

          get () {
            return state.get(queryPath);
          },

          remove () {
            const parent = state.get(path);
            if (_.isArray(parent)) {
              state.splice(path, [ query, 1 ]);
            } else {
              state.unset(queryPath);
            }
          }
        };
      };


      self[key].asArray = () => {
        const current = state.get(path);
        if (!_.isArray(current)) {
          throw new Error(`${path} is not an array`);
        }
        return {
          get () {
            return state.get(path);
          },

          add (value) {
            state.push(path, value);
          },

          updateEach (update) {
            state.set(
              path,
              current.map(
                (item) => _.defaults({}, update, item)));
          },

          filter (fn) {
            state.set(path, current.filter(fn));
          }
        };
      };

      return self;
    }
    , {});
};
