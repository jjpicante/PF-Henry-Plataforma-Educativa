const { Router } = require("express");
const { ResetPassword } = require("../../Controllers/Firebase/resetPassword");

const resetRouter = Router();

resetRouter.post("/", async (req, res) => {
    const { email } = req.body
    console.log(req.body)
    const response = await ResetPassword(email);
    if (response.success) {
        return res.status(200).json({ message: "Password Reset Successful" });
    } else {
        return res.status(503).json({ error: "Failed to Reset the Password" });
    }
});

module.exports = resetRouter;