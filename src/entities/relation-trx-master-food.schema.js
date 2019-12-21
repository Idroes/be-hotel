import { EntitySchema } from "typeorm";

const RelationTrxMasterFoodSchema = new EntitySchema({
  name: "RelationTrxMasterFood",
  target: "RelationTrxMasterFood",
  tableName: "relation_trxfood_masterfood",
  columns: {
    idRelation: {
      primary: true,
      name: "id_relation",
      type: "int",
      generated: true
    },
    trxFoodBeverageId: {
      name: "trx_food_beverage_id",
      type: "int"
    },
    masterFoodBeverageId: {
      name: "master_food_beverage_id",
      type: "int"
    }
  },
  relations: {
    trxFB: {
      target: "TrxFoodBeverage",
      type: "many-to-one",
      eager: true,
      joinColumn: {
        name: "trx_food_beverage_id"
      }
    },
    msFB: {
      target: "FoodBeverage",
      type: "many-to-one",
      eager: true,
      joinColumn: {
        name: "master_food_beverage_id"
      }
    }
  }
});

export default RelationTrxMasterFoodSchema;
