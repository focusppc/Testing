const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
require("dotenv").config();

class Mailer extends helper.Mail {
  constructor({ subject, email }, content) {
    super();

    this.sgApi = sendgrid(process.env.SENDGRID_API_KEY);
    this.from_email = new helper.Email("atawineapuliba@gmail.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.email = this.formatAddresses(email);

    this.addContent(this.body);
    this.addClickTracking();
    //this.addRecipients();
  }

  formatAddresses(email) {
    //const email = "richard@focuspp.com";
    return new helper.Email(email);
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach((email) => {
      personalize.addTo(email);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
