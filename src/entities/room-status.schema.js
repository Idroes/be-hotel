import { EntitySchema } from "typeorm";

const RoomStatusSchema = new EntitySchema({
  name: "RoomStatus",
  target: "RoomStatus",
  tableName: "status_room",
  columns: {
    idStatus: {
      primary: true,
      name: "id_status",
      type: "int"
    },
    statusCode: {
      name: "status_code",
      type: "varchar"
    },
    statusName: {
      name: "status_name",
      type: "int"
    }
  }
});

export default RoomStatusSchema;
