const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecipientSchema = require("./recipients");

const messageSchema = new Schema({
  title: String,
  body: String,
  email: String,
  recipients: [RecipientSchema],
  isRead: false,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

module.exports = mongoose.model("Messages", messageSchema);
