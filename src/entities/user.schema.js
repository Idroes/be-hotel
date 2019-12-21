import { EntitySchema } from "typeorm";

const UserSchema = new EntitySchema({
  name: "User",
  target: "User",
  tableName: "ms_user",
  columns: {
    idUser: {
      primary: true,
      name: "id_user",
      type: "int",
      generated: true
    },
    emailUser: {
      name: "email_user",
      type: "varchar"
    },
    usernameUser: {
      name: "username_user",
      type: "varchar"
    },
    passwordUser: {
      name: "password_user",
      type: "varchar"
    },
    typeUser: {
      name: "type_user",
      type: "int"
    },
    statusUser: {
      name: "status_user",
      type: "int"
    }
  },
  relations: {
    detail: {
      target: "UserDetail",
      type: "one-to-one",
      cascade: true,
      eager: true,
      inverseSide: "user"
    }
  }
});

export default UserSchema;
