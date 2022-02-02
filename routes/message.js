const express = require("express");
const router = express.Router();
const messages = require("../controllers/message");

router.get("/api/message", messages.renderMessage);
router.post("/api/message", messages.message);
router.post("/api/webhooks", messages.messageWebhooks);

module.exports = router;
