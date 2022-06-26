import twilio from 'twilio';
import dotenv from 'dotenv';

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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default sms;
