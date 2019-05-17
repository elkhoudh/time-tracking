const db = require("../data/dbConfig");

const find = tbl => db(tbl);

const findBy = (tbl, filter) =>
  db(tbl)
    .where(filter)
    .first();

const findAllBy = (tbl, filter) => db(tbl).where(filter);

const add = (tbl, item) =>
  db(tbl)
    .insert(item)
    .returning("id");

const remove = (tbl, filter) =>
  db(tbl)
    .where(filter)
    .del();

const update = (tbl, filter, item) =>
  db(tbl)
    .where(filter)
    .update(item);

const groupedCategories = id =>
  db
    .select("timers.description")
    .count("*")
    .where({ user_id: id })
    .from("timers")
    .groupBy("timers.description");

module.exports = {
  find,
  findBy,
  findAllBy,
  add,
  remove,
  update,
  groupedCategories
};
