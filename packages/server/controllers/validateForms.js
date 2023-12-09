const {formSchemaLogin, formSchemaRegister} = require('@app-messages/common')

const validateFormLogin = (req, res) => {
  const formData = req.body;
  formSchemaLogin
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        console.log("form is good");
      }
    });
};

const validateFormRegister = (req, res) => {
  const formData = req.body;
  formSchemaRegister
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        console.log("form is good");
      }
    });
};

module.exports = {validateFormLogin, validateFormRegister};
