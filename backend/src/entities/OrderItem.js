const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "OrderItem",
  tableName: "order_items",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    productName: {
      type: "varchar",
    },

    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    quantity: {
      type: "int",
    },

    subtotal: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },
  },

  relations: {
    order: {
      type: "many-to-one",
      target: "Order",
      joinColumn: true,
    },
  },
});