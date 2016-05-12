var catbee = require('catbee');
var handlebars = require('catbee-handlebars');
var storage = require('./services/storage');
var helpers = require('./services/helpers');
var history = require('./services/history');

var cat = catbee.create({
  logger: {
    levels: 'error'
  }
});

handlebars.register(cat.locator);
helpers.register(cat.locator);
storage.register(cat.locator);
history.register(cat.locator);

cat.startWhenReady();
