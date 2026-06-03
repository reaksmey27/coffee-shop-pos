const AppDataSource = require("../config/datasource");

const orderRepo = () =>
  AppDataSource.getRepository("Order");

// DASHBOARD STATS
exports.getStats = async (req, res) => {
  try {
    const orders = await orderRepo().find();

    const totalOrders = orders.length;

    const totalSales = orders.reduce((sum, o) => {
      return sum + Number(o.totalAmount);
    }, 0);

    const pending = orders.filter(o => o.status === "pending").length;
    const completed = orders.filter(o => o.status === "completed").length;

    res.json({
      totalOrders,
      totalSales,
      pending,
      completed,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};