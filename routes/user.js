const express = require("express");
const router = express.Router();
const users = require("../controllers/user");

router.get("/register", users.renderRegister);
router.post("/register", users.register);
router.post("/api/webhooks", users.apiWebhooks);
router.get("/login", users.renderLogin);
router.post("/login", users.login);

module.exports = router;
