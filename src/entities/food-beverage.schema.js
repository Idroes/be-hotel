import { EntitySchema } from "typeorm";

const FoodBeverageSchema = new EntitySchema({
  name: "FoodBeverage",
  target: "FoodBeverage",
  tableName: "master_food_beverage",
  columns: {
    idFoodBeverage: {
      primary: true,
      name: "id_food_beverage",
      type: "int",
      generated: true
    },
    foodBeverageCode: {
      name: "food_beverage_code",
      type: "varchar"
    },
    foodBeverageName: {
      name: "food_beverage_name",
      type: "varchar"
    },
    costFoodBeverage: {
      name: "cost_food_beverage",
      type: "int"
    },
    statusFoodBeverage: {
      name: "status_food_beverage",
      type: "int"
    }
  },
  relations: {
    imagesFoodBeverage: {
      target: "FoodBeverageImage",
      type: "one-to-many",
      eager: true,
      inverseSide: "foodBeverage"
    }
  }
});

export default FoodBeverageSchema;
