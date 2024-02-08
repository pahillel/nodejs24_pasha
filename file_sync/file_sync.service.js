const fs = require('fs/promises');
const path = require('path');
const logger = require('../utils/logger')('file_sync');
const { checkExists, createDirectory } = require('../helpers/create-directory');

const copyDirectory = async (source, target) => {
  try {
    const files = await fs.readdir(source);

    for (const file of files) {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);

      const isTargetExists = await checkExists(targetPath);
      const isDirectory = (await fs.stat(sourcePath)).isDirectory();

      if (isDirectory) {
        await createDirectory(targetPath, isTargetExists);
        await copyDirectory(sourcePath, targetPath);

        continue;
      }

      await copyFile(sourcePath, targetPath, isTargetExists);
    }
  } catch (error) {
    logger.error(`Directory ${source} copy error`, error.message);
  }
};

const copyFile = async (source, target, isExists = false) => {
  try {
    if (isExists) {
      logger.warn(`File ${target} already exists`);
      return;
    }

    await fs.copyFile(source, target);

    logger.info(`File ${source} was copied`);
  } catch (error) {
    logger.error(`File ${source} copy error:`, error);
  }
};

module.exports = {
  copyDirectory,
  checkExists,
  createDirectory
};
