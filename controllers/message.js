const Message = require("../models/messages");
const Mailer = require("../services/Mailer");
const messagingTemplate = require("../services/messagingTemplate");

module.exports.renderMessage = async (req, res) => {
  const message = await Message.find({ _user: req.user.id }).select({
    recipient: false,
  });

  res.send(message);
};

module.exports.messageWebhooks = async (req, res) => {
  // _.chain(req.body)
  //   .map(({ email, url }) => {
  //     const match = p.test(new URL(url).pathname);
  //     if (match) {
  //       return { email, surveyId: match.surveyId, choice: match.choice };
  //     }
  //   })
  //   .compact()
  //   .uniqBy("email", "surveyId")
  //   .each(({ surveyId, email, choice }) => {
  //     Survey.updateOne(
  //       {
  //         _id: surveyId,
  //         recipients: {
  //           $elemMatch: { email: email, responded: false },
  //         },
  //       },
  //       {
  //         $inc: { [choice]: 1 },
  //         $set: { "recipients.$.responded": true },
  //         lastResponded: new Date(),
  //       }
  //     ).exec();
  //   })
  //   .value();

  res.send("This is the webhook response");
};
module.exports.message = async (req, res) => {
  const email = "richard@focusppc.com";
  const body = "Welcome to Amaly, we're grateful for your trust";
  const title = "Amaly welcomes You";
  const message = new Message({
    title,
    body,
    email,
    dateSent: Date.now(),
  });

  //Setting mailer config with the route
  const mailer = new Mailer(message, messagingTemplate(message));

  try {
    await mailer.send();
    await message.save();
    res.send("Message sucessfully sent");
    //const user = await req.user.save();

    //res.send(user);
    console.log(message);
  } catch (err) {
    res.status(422).send(err);
  }
};
// module.exports.updateMessage = (req, res) => {
//   res.send("This is the update message route");
// };
