/**
 * Сборщик серверного приложения на основе
 * <catbee> и <express>. Служит для
 * создания инстанса приложения.
 */
var catbee = require('catbee');
var components = require('catbee-web-components');
var express = require('express');
var path = require('path');
var compression = require('compression');
var storage = require('./services/storage');
var routes = require('./routes');
var document = require('./components/document');

/**
 * Создание инстанса приложения
 *
 * @param {Object} config - application config
 * @returns {Promise} - express app
 */
exports.create = function create (config) {
  var cat = catbee.create(config);
  var app = express();

  var staticPath = path.join(__dirname, config.staticPath);

  storage.register(cat.locator);
  components.register(cat.locator, document);

  // Register routes
  routes.forEach((route) => cat.registerRoute(route));

  cat.locator
    .resolve('eventBus')
    .on('error', (error) => console.log(error));

  app.use(compression());
  app.use(cat.getMiddleware());
  app.use(express.static(staticPath));

  return Promise.resolve(app);
};
