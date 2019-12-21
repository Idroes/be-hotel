import { EntitySchema } from "typeorm";

const RoomSchema = new EntitySchema({
  name: "Room",
  target: "Room",
  tableName: "master_room",
  columns: {
    idRoom: {
      primary: true,
      name: "id_room",
      type: "int",
      generated: true
    },
    roomCode: {
      name: "room_code",
      type: "varchar"
    },
    roomNo: {
      name: "room_no",
      type: "int"
    },
    statusRoom: {
      name: "status_room",
      type: "int"
    },
    roomType: {
      name: "room_type",
      type: "int"
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
      eager: true,
      joinColumn: {
        name: "hotel_id"
      }
    },
    images: {
      target: "RoomImage",
      type: "one-to-many",
      eager: true,
      inverseSide: "room"
    },
    type: {
      target: "RoomType",
      type: "many-to-one",
      eager: true,
      joinColumn: {
        name: "room_type"
      }
    },
    status: {
      target: "RoomStatus",
      type: "many-to-one",
      eager: true,
      joinColumn: {
        name: "status_room"
      }
    }
  }
});

export default RoomSchema;
