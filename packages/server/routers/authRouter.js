const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const {
  validateFormLogin,
  validateFormRegister,
} = require("../controllers/validateForms");

router.post("/login", async (req, res) => {
  validateFormLogin(req, res);

  const potentialLogin = await pool.query(
    "SELECT id, username, passhash FROM userslist u WHERE u.username=$1",
    [req.body.username]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passhash
    );

    if (isSamePass) {
      user = {
        username: req.body.username,
        id: potentialLogin.rows[0].id,
      };
      res.json({ loggedIn: true, username: user });
    } else {
      res.statusMessage = "Usuário ou senha incorretos.";
      res.status(400).end();
    }
  } else {
    res.statusMessage = "Usuário ou senha incorretos.";
    res.status(400).end();
  }
});

router.post("/register", async (req, res) => {
  validateFormRegister(req, res);

  const existingUser = await pool.query(
    "SELECT username from userslist WHERE username=$1",
    [req.body.username]
  );

  const existingEmail = await pool.query(
    "SELECT username from userslist WHERE email=$1",
    [req.body.email]
  );

  if (existingUser.rowCount === 0 && existingEmail.rowCount === 0) {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO userslist(username, email, passhash) values($1, $2, $3) RETURNING username",
      [req.body.username, req.body.email, hashedPass]
    );

    user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };

    res.json({ loggedIn: true, user });
  } else {
    res.statusMessage = "Nome de usuário e/ou email já utilizados";
    res.status(400).end();
  }
});

module.exports = router;
