
exports.seed = function(knex) {
  return knex('table_name').insert([
    { username: 'mk', password: 'aPass' },
  ]);
};
