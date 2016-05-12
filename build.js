require('babel/register');

var catbee = require('catbee');
var handlebars = require('catbee-handlebars');
var babel = require('catberry-es6');

var cat = catbee.create({});

handlebars.register(cat.locator);
babel.register(cat.locator);

cat.build();
