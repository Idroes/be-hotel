import { getRepository } from "typeorm";
import TrxFoodBeverageSchema from "../entities/trx-food-beverage.schema";

export default class TrxFoodBeverageRepository {
  trxFoodBeverageRepository() {
    return getRepository(TrxFoodBeverageSchema);
  }
}
