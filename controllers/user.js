require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const _ = require("lodash");
const URL = require("url");
const Message = require("../models/messages");
const User = require("../models/user");
const messagingTemplate = require("../services/messagingTemplate");
const Mailer = require("../services/Mailer2");
// sgMail.setApiKey(
//   "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"
// );

module.exports.renderRegister = (req, res) => {
  res.send("This the register form for the user");
};
module.exports.apiWebhooks = async (req, res) => {
  const { recipients } = messages.recipients.email;
  const findMessage = await Message.findOne({ recipients: recipients });
  console.log(findMessage);
};
module.exports.register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, async (err) => {
      if (err) return next(err);
      res.status(200).send("Sucessfully registered");
      //setting message configuration
      // const title = "Welcome Message";
      // const body = "Welcome to Amaly group, we pleased to have you";
      // const msg = {
      //   to: email,
      //   from: "richard@focusppc.com",
      //   subject: title,
      //   text: body,

      //   // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      // };
      // const message = new Message({
      //   title: msg.subject,
      //   body: msg.text,
      //   dateSent: Date.now(),
      //   isRead: false,
      //   email: email,
      //   _user: req.user.id,
      // });
      //await sgMail.send(msg);
      //await message.save();
      const title = "Welcome Message";
      const body = "Amaly market welcomes you!";
      const recipients = req.user.email;

      const message = new Message({
        title,
        body,
        recipients: recipients.split(",").map((email) => ({ email })),
        _user: req.user.id,
        dateSent: Date.now(),
      });

      // Great place to send an email!
      const mailer = new Mailer(message, messagingTemplate(message));

      await mailer.send();
      await message.save();
      //const user = await req.user.save();

      res.status(422).send(err);
      //res.send(user);
    });
  } catch (err) {
    res.status(422).send(err);
    const { username, email } = req.body;
    const findUsername = await User.findOne({ username: username });
    const findEmail = await User.findOne({ email: email });
    if (findUsername) {
      req.flash("error", "A user with a given Username already exist");
      res.redirect("/register");
    } else if (findEmail) {
      req.flash("error", "A user with a given Email already exist");
      res.redirect("/register");
    } else {
      req.flash("error", "A user with a given email or username already exist");
      res.redirect("register");
    }
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("This is the login form");
};
module.exports.login = (req, res) => {
  res.send("This is the login route with passport");
};
