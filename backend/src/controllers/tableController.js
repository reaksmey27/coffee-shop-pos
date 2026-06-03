const AppDataSource = require("../config/datasource");

const repo = () => AppDataSource.getRepository("Table");

// GET ALL
exports.getAll = async (req, res) => {
  const tables = await repo().find();
  res.json(tables);
};

// CREATE
exports.create = async (req, res) => {
  const table = repo().create(req.body);
  await repo().save(table);

  res.json(table);
};