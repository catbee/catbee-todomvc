const catbee = require('catbee');
const components = require('catbee-web-components');
const logger = require('catbee-logger');
const routes = require('./routes');
const storage = require('./src/services/storage');
const cat = catbee.create(global.CONFIG);

components.register(cat.locator, require('./src/page/components/Document'));
routes.register(cat);
logger.register(cat.locator);
storage.register(cat.locator);

cat.startWhenReady();
