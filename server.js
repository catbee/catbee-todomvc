const config = require('./config');

require('handlebars');

const express = require('express');
const compression = require('compression');
const path = require('path');
const catbee = require('catbee');
const components = require('catbee-web-components');
const routes = require('./routes');
const logger = require('catbee-logger');
const storage = require('./src/services/storage');

const app = express();
const cat = catbee.create(config);

components.register(cat.locator, require('./src/page/components/Document'));
routes.register(cat);
storage.register(cat.locator);
logger.register(cat.locator);

app.use(compression());
app.use(express.static(path.join(__dirname, './public')));
app.use(cat.getMiddleware());

app.listen(config.port, () => {
  const log = cat.locator.resolve('logger');
  log.info(`Server ready and listen ${config.port} port.`);
});
