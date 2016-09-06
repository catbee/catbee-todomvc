module.exports = (root = [], tree = []) => {
  const pathForKey = (self, key) => {
    self[key] = root.concat(key);
    return self;
  };

  return tree.reduce(
  (self, key) =>
    typeof key === 'string' ?
      pathForKey(self, key) :
      Object.keys(key)
        .reduce((subSelf, subKey) => {
          subSelf[subKey] = pathForKey(subSelf, subKey);
          return subSelf;
        }, self)
  , { });
};
