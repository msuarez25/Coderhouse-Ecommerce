import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.SID, process.env.TOKEN);

/* WHATSAPP */

const sendWA = async (body) => {
  try {
    const message = {
      body: body,
      from: `whatsapp:${process.env.WANUMBER}`,
      to: `whatsapp:${process.env.ADMINNUMBER}`,
      mediaUrl: ['https://media.giphy.com/media/h4TdHo3RExSbHd9bOe/giphy.gif'],
    };
    const response = await client.messages.create(message);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default sendWA;
