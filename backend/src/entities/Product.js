const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Product",
  tableName: "products",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    name: {
      type: "varchar",
    },

    sku: {
      type: "varchar",
      unique: true,
    },

    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    image: {
      type: "varchar",
      nullable: true,
    },

    isAvailable: {
      type: "boolean",
      default: true,
    },
  },

  relations: {
    category: {
      type: "many-to-one",
      target: "Category",
      joinColumn: true,
      eager: true,
    },
  },
});
