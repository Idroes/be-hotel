import { EntitySchema } from "typeorm";

const GenderSchema = new EntitySchema({
  name: "Gender",
  target: "Gender",
  tableName: "ms_gender",
  columns: {
    idGender: {
      primary: true,
      name: "id_gender",
      type: "int"
    },
    codeGender: {
      name: "code_gender",
      type: "varchar"
    },
    genderName: {
      name: "gender_name",
      type: "varchar"
    }
  }
});

export default GenderSchema;
