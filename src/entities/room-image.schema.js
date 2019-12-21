import { EntitySchema } from "typeorm";

const RoomImageSchema = new EntitySchema({
  name: "RoomImage",
  target: "RoomImage",
  tableName: "image_room",
  columns: {
    idRoomImage: {
      primary: true,
      name: "id_room_image",
      type: "int",
      generated: true
    },
    sourceImage: {
      name: "source_image",
      type: "varchar"
    },
    roomId: {
      name: "room_id",
      type: "int"
    }
  },
  relations: {
    room: {
      target: "Room",
      type: "many-to-one",
      joinColumn: {
        name: "room_id"
      }
    }
  }
});

export default RoomImageSchema;
