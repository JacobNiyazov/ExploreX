const nodemailer = require("nodemailer");

const sendEmail = async (email) => {
    let subject = "TESTING EMAIL";
    let text = "THIS IS A TEST";
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            secure: true,
            auth: {
                user: "explorexapp@gmail.com",
                pass: "Explore22!",
            },
        });

        await transporter.sendMail({
            from: "explorexapp@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;