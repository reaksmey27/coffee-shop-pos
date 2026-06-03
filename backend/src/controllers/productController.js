const { Like } = require("typeorm");
const AppDataSource = require("../config/datasource");

const productRepo = () =>
  AppDataSource.getRepository("Product");

// GET ALL PRODUCTS + SEARCH
exports.getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await productRepo().find({
      where: {
        name: Like(`%${search}%`),
      },
      relations: ["category"],
      order: {
        id: "DESC",
      },
    });

    res.json(products);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// GET SINGLE PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await productRepo().findOne({
      where: {
        id: req.params.id,
      },
      relations: ["category"],
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = productRepo().create(req.body);

    await productRepo().save(product);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await productRepo().findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    productRepo().merge(product, req.body);

    await productRepo().save(product);

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productRepo().findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await productRepo().remove(product);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};