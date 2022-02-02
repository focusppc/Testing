const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
//const keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ title, recipients }, content) {
    super();

    this.sgApi = sendgrid(
      "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"
    );
    this.from_email = new helper.Email("richard@focusppc.com");
    this.subject = title;
    this.body = new helper.Content("text/html", content);
    this.recipients = recipients;

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    //const openTracking = new helper.OpenTracking(true, true);

    ///trackingSettings.setOpenTracking(openTracking);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
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
