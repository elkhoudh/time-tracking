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

const remove = (tbl, id) =>
  db(tbl)
    .where({ id })
    .del();

const update = (tbl, id, item) =>
  db(tbl)
    .where({ id })
    .update(item);

module.exports = {
  find,
  findBy,
  findAllBy,
  add,
  remove,
  update
};
