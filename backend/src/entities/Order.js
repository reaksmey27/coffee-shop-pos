const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Order",
  tableName: "orders",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    totalAmount: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    items: {
      type: "one-to-many",
      target: "OrderItem",
      inverseSide: "order",
      cascade: true,
    },

    table: {
      type: "many-to-one",
      target: "Table",
      joinColumn: true,
      nullable: true,
    },
  },
});
