import { EntitySchema } from "typeorm";

const UserDetailSchema = new EntitySchema({
  name: "UserDetail",
  target: "UserDetail",
  tableName: "user_detail",
  columns: {
    idUserDetail: {
      primary: true,
      name: "id_user_detail",
      type: "int",
      generated: true
    },
    fullnameUser: {
      name: "fullname_user",
      type: "varchar"
    },
    addressUser: {
      name: "address_user",
      type: "varchar"
    },
    noPhoneUser: {
      name: "no_phone_user",
      type: "varchar"
    },
    saldoUser: {
      name: "saldo_user",
      type: "int"
    },
    sourcePhotoProfile: {
      name: "source_photo_profile",
      type: "varchar"
    },
    genderId: {
      name: "gender_id",
      type: "int"
    }
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: {
        name: "id_user_detail"
      }
    },
    gender: {
      target: "Gender",
      type: "many-to-one",
      eager: true,
      joinColumn: {
        name: "gender_id"
      }
    }
  }
});

export default UserDetailSchema;
