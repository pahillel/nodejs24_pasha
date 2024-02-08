const fsAsync = require('fs/promises');
const fs = require('fs');

const createDirectory = async (target, isExists = false) => {
  try {
    if (isExists) {
      return;
    }

    await fsAsync.mkdir(target);
  } catch (error) {
    throw new Error(`Directory ${target} create error: ${error}`);
  }
};

const checkExists = async (path) => {
  try {
    await fsAsync.access(path);

    return true;
  } catch (error) {
    return false;
  }
};

const createDirectorySync = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

module.exports = {
  createDirectory,
  checkExists,
  createDirectorySync
};
