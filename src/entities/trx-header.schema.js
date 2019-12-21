import { EntitySchema } from "typeorm";

const HeaderSchema = new EntitySchema({
  name: "Header",
  target: "Header",
  tableName: "trx_header",
  columns: {
    idHeader: {
      primary: true,
      name: "id_header",
      type: "int",
      generated: true
    },
    noTrx: {
      name: "no_trx",
      type: "varchar"
    },
    userDetailId: {
      name: "user_detail_id",
      type: "int"
    },
    hotelId: {
      name: "hotel_id",
      type: "int"
    }
  }
});
export default HeaderSchema;
