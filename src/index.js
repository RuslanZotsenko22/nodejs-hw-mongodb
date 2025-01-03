import { setupServer } from './server.js';
import { initMongoConnection } from '../src/db/initMongoConnection.js';

import { createDirIfNotExists } from './untils/createDirlfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constans/index.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

void bootstrap();
