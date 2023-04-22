const { Router } = require("express");
const { postLogin } = require("../../Controllers/loggin/postLogin");
const { googleVerifier } = require("../../Controllers/loggin/googleVerifier");

const loginrouter = Router();

loginrouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const respuesta = await postLogin(email, password);
  if (!respuesta.error) return res.status(200).json(respuesta);
  return res.status(503).json(respuesta);
});

loginrouter.post("/google", async (req, res) => {
  const { email } = req.body;

  try {
    const userData = await googleVerifier(email);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = loginrouter;
