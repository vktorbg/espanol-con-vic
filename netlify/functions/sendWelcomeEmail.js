// netlify/functions/sendWelcomeEmail.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const { email, firstName } = JSON.parse(event.body);

  try {
    const data = await resend.emails.send({
      from: 'Spanish Fluency School <info@spanishfluencyschool.com>',
      to: [email],
      subject: 'Welcome to Spanish Fluency School!',
      html: `<p>Hola ${firstName},</p>
             <p>Thanks for signing up! We're excited to have you at Spanish Fluency School 🎉</p>
             <p>Let’s get fluent together!</p>`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };

  } catch (error) {
    console.error('Resend error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email failed to send.' })
    };
  }
}
