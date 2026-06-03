require("dotenv").config();

const app = require("./app");
const AppDataSource = require("./src/config/datasource");

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });