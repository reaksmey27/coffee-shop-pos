const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Table",
  tableName: "tables",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    name: {
      type: "varchar",
    },

    status: {
      type: "varchar",
      default: "available", // available | occupied
    },
  },
});