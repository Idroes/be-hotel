import { EntitySchema } from "typeorm";

const TrxFoodBeverageSchema = new EntitySchema({
  name: "TrxFoodBeverage",
  target: "TrxFoodBeverage",
  tableName: "trx_food_beverage",
  columns: {
    idTrxFoodBeverage: {
      primary: true,
      name: "id_trx_food_beverage",
      type: "int",
      generated: true
    },
    trxNo: {
      name: "trx_no",
      type: "varchar"
    },
    trxFoodBeverageNo: {
      name: "trx_food_beverage_no",
      type: "varchar"
    },
    quantityFoodBeverage: {
      name: "quantity_food_beverage",
      type: "int"
    },
    trxDate: {
      name: "trx_date",
      type: "date"
    },
    totalCost: {
      name: "total_cost",
      type: "int"
    }
  },
  relations: {
    header: {
      target: "Header",
      type: "many-to-one",
      eager: true,
      joinColumn: {
        name: "trx_no"
      }
    }
  }
});

export default TrxFoodBeverageSchema;
