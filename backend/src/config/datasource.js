require("reflect-metadata");
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: true,

  entities: [
    require("../entities/User"),
    require("../entities/Category"),
    require("../entities/Product"),
    require("../entities/Order"),
    require("../entities/OrderItem"),
  ],
});

module.exports = AppDataSource;
