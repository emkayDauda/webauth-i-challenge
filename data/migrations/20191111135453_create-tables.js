exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("userId");

    table
      .text("username", 20)
      .notNull()
      .unique();

    table.text("password").notNull();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
