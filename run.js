require('babel/register');

/**
 * Зависимости модуля
 */
var http = require('http');
var app = require('./app');

/**
 * Конфигурация приложения
 * @type {Object}
 */
var config = {
  port: 3000,
  staticPath: './public'
};

/**
 * Создает и запускает сервер
 *
 * @param {Object} instance
 * @returns {Promise}
 */
function start (instance) {
  return http.createServer(instance).listen(config.port);
}

/**
 * Создаем инстанс приложения и запускаем сервер
 */
app
  .create(config)
  .then(start);
