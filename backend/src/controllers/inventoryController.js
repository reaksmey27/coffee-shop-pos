const AppDataSource = require("../config/datasource");

const repo = () => AppDataSource.getRepository("Inventory");

// GET ALL
exports.getAll = async (req, res) => {
  const items = await repo().find();
  res.json(items);
};

// CREATE
exports.create = async (req, res) => {
  const item = repo().create(req.body);
  await repo().save(item);

  res.json(item);
};

// UPDATE STOCK
exports.updateStock = async (req, res) => {
  await repo().update(req.params.id, req.body);
  res.json({ message: "Stock updated" });
};