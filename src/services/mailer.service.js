import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporterGmail = createTransport({
  service: 'gmail',
  port: process.env.SMTPPORT,
  auth: {
    user: process.env.USERGMAIL,
    pass: process.env.PASSGMAIL,
  },
});

const sendMailGmail = async (subject, htmlBody) => {
  if (subject && htmlBody) {
    const mailOptions = {
      from: process.env.USERGMAIL,
      to: [process.env.EMAIL],
      subject: subject,
      html: htmlBody,
    };

    try {
      const response = await transporterGmail.sendMail(mailOptions);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('subject y/o htmlBody no fue incluido');
    return false;
  }
};

export default sendMailGmail;
