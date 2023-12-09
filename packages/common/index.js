const Yup = require("yup");

const formSchemaLogin = Yup.object({
  username: Yup.string()
    .required("Nome obrigatório!")
    .min(6, "Nome precisa ter no mínimo 6 caracteres")
    .max(25, "Nome não pode ter mais de 25 caracteres"),
  password: Yup.string()
    .required("Senha obrigatória!")
    .min(6, "Senha precisa ter no mínimo 6 caracteres")
    .max(25, "Senha não pode ter mais de 25 caracteres"),
});

const formSchemaRegister = Yup.object()
  .shape({
    username: Yup
      .string()
      .required("Nome obrigatório!")
      .min(6, "Nome precisa ter no mínimo 6 caracteres")
      .max(25, "Nome não pode ter mais de 25 caracteres"),
    password: Yup
      .string()
      .required("Senha obrigatória!")
      .min(6, "Senha precisa ter no mínimo 6 caracteres")
      .max(25, "Senha não pode ter mais de 25 caracteres"),
    email: Yup.string().required("Senha obrigatória!"),
  })
  .required();

module.exports = { formSchemaLogin, formSchemaRegister };
