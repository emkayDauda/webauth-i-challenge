exports.up = function(knex) {
  knex.schema.createTable("users", table => {
    table.increments("userId");

    table
      .text("username", 20)
      .notNull()
      .unique();

    table.text("password").notNull();
  });
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('users')
};
