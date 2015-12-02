module.exports = {
  register (locator) {
    try {
      var handlebars = locator.resolve('handlebars');
      handlebars.registerHelper('eq', eq);
    } catch (e) {
      // nothing to do.
    }
  }
};

/**
 * Equality helper
 * @param a
 * @param b
 * @returns {*}
 */
function eq (a, b) {
  var next =  arguments[arguments.length-1];
  console.log('helper');
  console.dir(next);
  return (a === b) ? next.fn(this) : next.inverse(this);
}
