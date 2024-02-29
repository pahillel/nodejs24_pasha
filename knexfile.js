/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'better-sqlite3',
  connection: {
    filename: './database/dev.sqlite3'
  }
};
