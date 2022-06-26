import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/loggers.js';

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
    } catch (error) {
      logger.log('error', { ruta: req.url, metodo: req.method, error: error });
    }
  } else {
    logger.log('error', {
      ruta: req.url,
      metodo: req.method,
      error: 'subject y/o htmlBody no fue incluido',
    });
    return false;
  }
};

export default sendMailGmail;
