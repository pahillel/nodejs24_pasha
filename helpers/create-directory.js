const fs = require('fs/promises');

const createDirectory = async (target, isExists = false) => {
  try {
    if (isExists) {
      return;
    }

    await fs.mkdir(target);
  } catch (error) {
    throw new Error(`Directory ${target} create error: ${error}`);
  }
};

const checkExists = async (path) => {
  try {
    await fs.access(path);

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createDirectory,
  checkExists
};
