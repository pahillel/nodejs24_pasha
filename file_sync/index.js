const path = require('path');
const logger = require('../utils/logger')('file-sync');
const fileSyncService = require('./file-sync.service');

const start = async (source, target) => {
  source = source || path.join(__dirname, '..', 'source');
  target = target || path.join(__dirname, '..', 'target');

  try {
    logger.info('Start file sync...');

    const isExists = await fileSyncService.checkExists(target);

    if (!isExists) {
      await fileSyncService.createDirectory(target);
    }

    await fileSyncService.copyDirectory(source, target);
  } catch (error) {
    logger.error('File sync error:', error);
  } finally {
    logger.info('Finish copying files');
  }
};

module.exports = {
  start
};
