// netlify/functions/sendWelcomeEmail.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, firstName } = JSON.parse(req.body);

  try {
    const data = await resend.emails.send({
      from: 'Spanish Fluency School <info@spanishfluencyschool.com>',
      to: [email],
      subject: 'Welcome to Spanish Fluency School!',
      html: `<p>Hola ${firstName},</p>
             <p>Thanks for signing up! We're excited to have you at Spanish Fluency School 🎉</p>
             <p>Let’s get fluent together!</p>`,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Email failed to send.' });
  }
};
