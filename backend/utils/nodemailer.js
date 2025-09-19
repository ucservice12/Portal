// utils/nodemailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = async ({ to, subject, text, html }) => {
    return transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        text,
        html,
    });
};

module.exports = {
    sendEmail,
};
