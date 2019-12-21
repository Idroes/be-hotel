import { EntitySchema } from "typeorm";

const HotelImageSchema = new EntitySchema({
  name: "HotelImage",
  target: "HotelImage",
  tableName: "image_hotel",
  columns: {
    idHotelImage: {
      primary: true,
      name: "id_hotel_image",
      type: "int",
      generated: true
    },
    sourceImage: {
      name: "source_image",
      type: "varchar"
    },
    hotelId: {
      name: "hotel_id",
      type: "int"
    }
  },
  relations: {
    hotel: {
      target: "Hotel",
      type: "many-to-one",
      joinColumn: {
        name: "hotel_id"
      }
    }
  }
});

export default HotelImageSchema;
