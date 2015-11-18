var catbee = require('catbee');
var handlebars = require('catberry-handlebars');
var storage = require('./services/storage');

var cat = catbee.create({});
handlebars.register(cat.locator);
storage.register(cat.locator);

cat.startWhenReady();
