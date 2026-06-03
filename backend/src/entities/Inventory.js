const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Inventory",
  tableName: "inventory",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    name: {
      type: "varchar",
    },

    stock: {
      type: "int",
    },

    unit: {
      type: "varchar",
      default: "pcs",
    },

    minStock: {
      type: "int",
      default: 5,
    },
  },
});