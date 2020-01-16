
exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'mk', password: 'aPass' },
  ]);
};
