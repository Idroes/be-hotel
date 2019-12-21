import { getRepository, Equal, Not } from "typeorm";
import FoodBeverageSchema from "../entities/food-beverage.schema";

export default class FoodBeverageRepository {
  foodBeverageRepository() {
    return getRepository(FoodBeverageSchema);
  }

  async listFoodBeverageActive() {
    return await this.foodBeverageRepository().find(
      {
        statusFoodBeverage: Not(Equal(0))
      },
      {
        relations: ["images"]
      }
    );
  }

  async listFoodBeverage() {
    return await this.foodBeverageRepository().find({
      relations: ["images"]
    });
  }

  async findFoodBeverageById(id) {
    return await this.foodBeverageRepository().find({
      where: {
        idFoodBeverage: id
      }
    });
  }

  async addFoodBeverage(entity) {
    return await this.foodBeverageRepository().save(entity);
  }

  async updateFoodBeverage(entity) {
    return await this.foodBeverageRepository().update(
      entity.idFoodBeverage,
      entity
    );
  }

  async deleteFoodBeverage(entity) {
    return await this.foodBeverageRepository().update(
      entity.idFoodBeverage,
      entity
    );
  }
}
