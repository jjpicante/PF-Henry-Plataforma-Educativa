const { Router } = require("express");
const { ForgotPassword } = require("../../Controllers/Firebase/forgotPassword");

const resetRouter = Router();

resetRouter.post("/", async (req, res) => {
    const { email } = req.body
    const response = await ForgotPassword(email);
    if (response.success) {
        return res.status(200).json({ message: "Password Request Successful" });
    } else {
        return res.status(503).json({ error: "Failed to Request the Password" });
    }
});

module.exports = resetRouter;