const AppDataSource = require("../config/datasource");

const orderRepo = () =>
  AppDataSource.getRepository("Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = orderRepo().create({
      totalAmount,
      items,
    });

    await orderRepo().save(order);

    res.json({
      message: "Order created",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ORDERS
exports.getOrders = async (req, res) => {
  const orders = await orderRepo().find({
    relations: ["items"],
  });

  res.json(orders);
};