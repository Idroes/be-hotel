import { EntitySchema } from "typeorm";

const FoodBeverageImageSchema = new EntitySchema({
  name: "FoodBeverageImage",
  target: "FoodBeverageImage",
  tableName: "image_food_beverage",
  columns: {
    idFoodBeverageImage: {
      primary: true,
      name: "id_food_beverage_image",
      type: "int",
      generated: true
    },
    sourceImage: {
      name: "source_image",
      type: "varchar"
    },
    foodBeverageId: {
      name: "food_beverage_id",
      type: "int"
    }
  },
  relations: {
    foodBeverage: {
      target: "FoodBeverage",
      type: "many-to-one",
      joinColumn: {
        name: "food_beverage_id"
      }
    }
  }
});

export default FoodBeverageImageSchema;
