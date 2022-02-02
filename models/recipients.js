const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipientSchema = new Schema({
  email: String,
  isRead: { type: Boolean, default: false },
});

module.exports = recipientSchema;
