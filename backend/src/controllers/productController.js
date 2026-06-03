const AppDataSource = require("../config/datasource");

const productRepo = () =>
  AppDataSource.getRepository("Product");

// GET ALL
exports.getAll = async (req, res) => {
  const products = await productRepo().find();
  res.json(products);
};

// CREATE
exports.create = async (req, res) => {
  const product = productRepo().create(req.body);
  await productRepo().save(product);

  res.json(product);
};

// UPDATE
exports.update = async (req, res) => {
  await productRepo().update(req.params.id, req.body);
  res.json({ message: "Updated" });
};

// DELETE
exports.remove = async (req, res) => {
  await productRepo().delete(req.params.id);
  res.json({ message: "Deleted" });
};