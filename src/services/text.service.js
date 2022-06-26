import twilio from 'twilio';
import dotenv from 'dotenv';
import logger from '../utils/loggers.js';

dotenv.config();

const client = twilio(process.env.SID, process.env.TOKEN);

const sms = async (body, userNumber) => {
  try {
    const message = {
      body: body,
      from: process.env.NUMBER,
      to: userNumber,
    };
    const response = await client.messages.create(message);
  } catch (error) {
    logger.log('error', error.message);
  }
};

export default sms;
