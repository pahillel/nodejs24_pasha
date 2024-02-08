const path = require('path');
const logger = require('../utils/logger')('file_sync');
const { checkExists, createDirectory } = require('../helpers/create-directory');
const { copyDirectory } = require('./file_sync.service');

const start = async (source, target) => {
  source = source || path.join(__dirname, '..', 'source');
  target = target || path.join(__dirname, '..', 'target');

  try {
    logger.info('Start file sync...');

    const isExists = await checkExists(target);

    if (!isExists) {
      await createDirectory(target);
    }

    await copyDirectory(source, target);
  } catch (error) {
    logger.error('File sync error:', error);
  } finally {
    logger.info('Finish copying files');
  }
};

module.exports = {
  start
};
