const { Router } = require("express");
const { postLogout } = require("../../Controllers/loggin/postLogout");

const logoutRouter = Router();

logoutRouter.post("/", async (req, res) => {
  const response = await postLogout(req, res);
  if (response.success) {
    return res.status(200).json({ message: "Logout successful" });
  } else {
    return res.status(503).json({ error: "Failed to logout user" });
  }
});

module.exports = logoutRouter;