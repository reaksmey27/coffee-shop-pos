const AppDataSource = require("../config/datasource");

const orderRepo = () => AppDataSource.getRepository("Order");

// GET ONE ORDER
exports.getOne = async (req, res) => {
  try {
    const order = await orderRepo().findOne({
      where: { id: req.params.id },
      relations: ["items", "table"],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, table } = req.body;

    const inventoryRepo = AppDataSource.getRepository("Inventory");

    // 🧾 Create Order
    const order = orderRepo().create({
      totalAmount,
      status: "pending",
      table,
      items,
    });

    await orderRepo().save(order);

    // 📦 Reduce Inventory Stock
    for (const item of items) {
      const inventoryItem = await inventoryRepo.findOne({
        where: { name: item.name },
      });

      if (inventoryItem) {
        inventoryItem.stock -= item.qty;

        // prevent negative stock
        if (inventoryItem.stock < 0) {
          inventoryItem.stock = 0;
        }

        await inventoryRepo.save(inventoryItem);
      }
    }

    // 📡 Real-time update
    global.io.emit("new-order", order);

    res.json({
      message: "Order created successfully",
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
