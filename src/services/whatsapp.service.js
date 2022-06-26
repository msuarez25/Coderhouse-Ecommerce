import twilio from 'twilio';
import dotenv from 'dotenv';
import logger from '../utils/loggers.js';

dotenv.config();

const client = twilio(process.env.SID, process.env.TOKEN);

/* WHATSAPP */

const sendWA = async (body) => {
  try {
    const message = {
      body: body,
      from: `whatsapp:${process.env.WANUMBER}`,
      to: `whatsapp:${process.env.ADMINNUMBER}`,
      //   mediaUrl: [''],
    };
    const response = await client.messages.create(message);
  } catch (error) {
    logger.log('error', error.message);
  }
};

export default sendWA;
