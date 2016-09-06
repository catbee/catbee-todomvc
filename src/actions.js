const createSelf = require('./self');

module.exports = (paths, actions) => Object.keys(actions).reduce((result, name) => {
  const action = actions[name];
  result[name] = (args, state, output, services) => {
    action({
      args,
      self: createSelf(paths, state),
      output,
      state: {
        get (path) {
          return state.get(path);
        }
      },
      locator: services.locator,
      context: services.context
    });
  };
  return result;
}, {});
