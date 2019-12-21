import { EntitySchema } from "typeorm";

const RoomTypeSchema = new EntitySchema({
  name: "RoomType",
  target: "RoomType",
  tableName: "master_type_room",
  columns: {
    idTypeRoom: {
      primary: true,
      name: "id_type_room",
      type: "int",
      generated: true
    },
    typeName: {
      name: "type_name",
      type: "varchar"
    },
    roomSize: {
      name: "room_size",
      type: "varchar"
    },
    roomCapacity: {
      name: "room_capacity",
      type: "int"
    },
    roomCost: {
      name: "room_cost",
      type: "int"
    }
  }
});

export default RoomTypeSchema;
