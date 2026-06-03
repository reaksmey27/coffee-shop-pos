const AppDataSource = require("../config/datasource");

const orderRepo = () => AppDataSource.getRepository("Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, table } = req.body;

    const order = orderRepo().create({
      totalAmount,
      status: "pending",
      table,
      items,
    });

    await orderRepo().save(order);

    global.io.emit("new-order", order);

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

// UPDATE ORDER STATUS
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  await orderRepo().update(req.params.id, { status });

  res.json({
    message: "Status updated",
  });
};
