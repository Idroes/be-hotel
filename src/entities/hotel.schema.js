import { EntitySchema } from "typeorm";

const HotelSchema = new EntitySchema({
  name: "Hotel",
  target: "Hotel",
  tableName: "master_hotel",
  columns: {
    idHotel: {
      primary: true,
      name: "id_hotel",
      type: "int",
      generated: true
    },
    hotelCode: {
      name: "hotel_code",
      type: "varchar"
    },
    hotelName: {
      name: "hotel_name",
      type: "varchar"
    },
    hotelAddress: {
      name: "hotel_address",
      type: "varchar"
    },
    addressCity: {
      name: "address_city",
      type: "varchar"
    },
    addressDistrict: {
      name: "address_district",
      type: "varchar"
    },
    addressVillage: {
      name: "address_village",
      type: "varchar"
    },
    postalCode: {
      name: "postal_code",
      type: "int"
    },
    numberOfRooms: {
      name: "number_of_rooms",
      type: "int"
    }
  },
  relations: {
    images: {
      target: "HotelImage",
      type: "one-to-many",
      inverseSide: "hotel"
    },
    room: {
      target: "Room",
      type: "one-to-many",
      inverseSide: "hotel"
    }
  }
});

export default HotelSchema;
