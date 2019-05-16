exports.up = function(knex, Promise) {
  return knex.schema.createTable("timers", tbl => {
    tbl.increments();
    tbl.string("description");
    tbl.boolean("started").defaultTo(false);
    tbl.string("started_at");
    tbl.string("ended_at");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("timers");
};
