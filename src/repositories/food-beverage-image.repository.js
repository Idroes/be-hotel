import { getRepository, Not, Equal } from "typeorm";
import FoodBeverageImageSchema from "../entities/food-beverage-image.schema";

export default class FoodBeverageImageRepository {
  foodBeverageImageRepository() {
    return getRepository(FoodBeverageImageSchema);
  }

  async findFoodBeverageImageByFoodBeverageId(id) {
    return await this.foodBeverageImageRepository().find({
      where: { foodBeverageId: id }
    });
  }

  async addImageFoodBeverage(listFoodBeverage) {
    return await this.foodBeverageImageRepository().save(listFoodBeverage);
  }

  async deleteImageFoodBeverage(id) {
    return await this.foodBeverageImageRepository().delete(id);
  }
}
