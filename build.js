require('babel/register');
var catbee = require('catbee');
var handlebars = require('catberry-handlebars');

var cat = catbee.create({});
handlebars.register(cat.locator);

cat.build();
