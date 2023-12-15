require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {

  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });
  
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        //console.log(err)
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "explorexapp@gmail.com",
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

const sendEmail = async (email, link) => {
    let emailTransporter;
    try {
        emailTransporter = await createTransporter();
    } catch (error) {
        console.error('Error sending email:', error);
    }
    //console.log("SENDING EMAIL")
    try {
    await emailTransporter.sendMail({
        subject: "Password Reset Request from Explore X",
        text: "You have recently requested a password for ExploreX. This link is only valid for 60 minutes. \n\n" + link + "\n\n Not you? Someone may be trying to log into your account. Contact the support team at explorexapp@gmail.com. \n\n From,\n The ExploreX Team.",
        to: email,
        from: "explorexapp@gmail.com"
      });
    } catch (error) {
    console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;