// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefaultTrue: true,
    connection: {
      filename: './data/hold.db3'
    },
    migrations: {
      directory: "./data/migrations/"
    },
    seeds: {
      directory: "./data/seeds/"
    }
  },

};
