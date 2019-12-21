import { EntitySchema } from "typeorm";

const DetailSchema = new EntitySchema({
  name: "Detail",
  target: "Detail",
  tableName: "trx_detail",
  columns: {
    idDetail: {
      primary: true,
      name: "id_detail",
      type: "int",
      generated: true
    },
    trxNo: {
      name: "trx_no",
      type: "varchar"
    },
    trxDate: {
      name: "trx_date",
      type: "date"
    },
    dateCheckIn: {
      name: "date_check_in",
      type: "date"
    },
    dateCheckOut: {
      name: "date_check_out",
      type: "date"
    },
    roomId: {
      name: "room_id",
      type: "int"
    },
    totalCost: {
      name: "total_cost",
      type: "int"
    }
  },
  relations: {
    header: {
      target: "Header",
      type: "many-to-one",
      cascade: true,
      eager: true,
      joinColumn: {
        name: "trx_no"
      }
    }
  }
});
export default DetailSchema;
