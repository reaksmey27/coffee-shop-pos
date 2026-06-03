const AppDataSource = require("../config/datasource");

const orderRepo = () =>
  AppDataSource.getRepository("Order");

exports.getSalesReport = async (req, res) => {
  try {
    const orders = await orderRepo().find();

    const totalSales = orders.reduce(
      (sum, o) => sum + Number(o.totalAmount),
      0
    );

    const totalOrders = orders.length;

    const pending = orders.filter(
      (o) => o.status === "pending"
    ).length;

    const completed = orders.filter(
      (o) => o.status === "completed"
    ).length;

    res.json({
      totalSales,
      totalOrders,
      pending,
      completed,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};