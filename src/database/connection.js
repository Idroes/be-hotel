// import mysql from "mysql";
import configure from "../config";
import { createConnection } from "typeorm";
import UserSchema from "../entities/user.schema";
import UserDetailSchema from "../entities/user-detail.schema";
import GenderSchema from "../entities/gender.schema";
import HotelSchema from "../entities/hotel.schema";
import HotelImageSchema from "../entities/hotel-image.schema";
import RoomSchema from "../entities/room.schema";
import RoomImageSchema from "../entities/room-image.schema";
import RoomTypeSchema from "../entities/room-type.schema";
import RoomStatusSchema from "../entities/room-status.schema";
import FoodBeverageSchema from "../entities/food-beverage.schema";
import FoodBeverageImageSchema from "../entities/food-beverage-image.schema";
import HeaderSchema from "../entities/trx-header.schema";
import DetailSchema from "../entities/trx-detail.schema";
import TrxFoodBeverageSchema from "../entities/trx-food-beverage.schema";
import RelationTrxMasterFoodSchema from "../entities/relation-trx-master-food.schema";

const { dbHost, dbUser, dbPassword, dbName, dbType, dbPort } = configure();

const createDbConnection = async () => {
  const connection = await createConnection({
    type: dbType || "mysql",
    host: dbHost || "localhost",
    port: dbPort || "3306",
    username: dbUser || "root",
    password: dbPassword || "",
    database: dbName || "hotel_db",
    entities: [
      UserSchema,
      UserDetailSchema,
      GenderSchema,
      HotelSchema,
      HotelImageSchema,
      RoomSchema,
      RoomImageSchema,
      RoomTypeSchema,
      RoomStatusSchema,
      FoodBeverageSchema,
      FoodBeverageImageSchema,
      HeaderSchema,
      DetailSchema,
      TrxFoodBeverageSchema,
      RelationTrxMasterFoodSchema
    ]
  });

  return connection;
};

export default createDbConnection;
