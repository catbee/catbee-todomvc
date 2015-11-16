/**
 * Сборщик серверного приложения на основе
 * <catberry> и <express>. Служит для
 * создания инстанса приложения.
 */
var catbee = require('catbee');
var express = require('express');
var handlebars = require('catberry-handlebars');
var path = require('path');
var compression = require('compression');

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

  handlebars.register(cat.locator);

  app.use(compression());
  app.use(cat.getMiddleware());
  app.use(express.static(staticPath));

  return Promise.resolve(app);
};
