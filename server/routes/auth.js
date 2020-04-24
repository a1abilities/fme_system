const express = require('express')
const Auth = require('../controllers/auth.js');

const authRouter = express.Router();

authRouter.post("/login", Auth.login);
authRouter.get("/verifyEmail", Auth.verifyEmail);
authRouter.post("/forgotPassword", Auth.forgotPassword);

module.exports = authRouter;
