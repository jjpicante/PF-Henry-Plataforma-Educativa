const { Router } = require("express");
const { postLogin } = require("../../Controllers/loggin/postLogin");

const loginrouter = Router();

loginrouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const respuesta = await postLogin(password, username);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

module.exports = loginrouter;
