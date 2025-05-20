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
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Spanish Fluency School</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <!-- HEADER -->
          <tr>
            <td style="background-color: #F7931E; padding: 20px 30px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Welcome to Spanish Fluency School!</h1>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; line-height: 1.6;">Hi ${firstName},</p>
              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for joining our community! I'm <strong>Vic</strong>, founder and head coach at <strong>Spanish Fluency School</strong>, and I'm excited to support you on your journey to Spanish fluency.
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                As a welcome gift, you get a <strong>free trial session</strong> to experience how we work:
              </p>

              <p style="text-align: center; margin: 30px 0;">
                <a href="https://your-scheduling-link.com" style="background-color: #007BFF; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Book My Free Class</a>
              </p>

              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

              <h3 style="color: #F7931E;">What can you do in your Dashboard?</h3>
              <p style="font-size: 16px; line-height: 1.6;">After your trial class, you’ll get access to all features, including:</p>
              <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px;">
                <li>📅 Schedule and reschedule your classes</li>
                <li>🎥 Join your Zoom classroom with one click</li>
                <li>📁 Access your personal Google Drive folder</li>
                <li>📚 Explore creative reading and practice materials</li>
                <li>💳 Make payments (PayPal, bank transfer, Binance)</li>
              </ul>

              <p style="font-size: 16px; line-height: 1.6;">
                Everything in one place to make learning Spanish easy and enjoyable.
              </p>

              <p style="text-align: center; margin: 30px 0;">
                <a href="https://spanishfluencyschool.com/dashboard" style="background-color: #F7931E; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to My Dashboard</a>
              </p>

              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

              <p style="font-size: 16px; line-height: 1.6;">
                Curious about all our plans and services? You can check them out here:
              </p>

              <p style="text-align: center; margin: 30px 0;">
                <a href="https://spanishfluencyschool.com/services" style="background-color: #007BFF; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Plans & Pricing</a>
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                Please note: this is an automated message and replies to this email will not be received.  
                If you have any questions, you can write directly to us at:  
                <a href="mailto:spanishfluencyschool@gmail.com" style="color: #007BFF;">spanishfluencyschool@gmail.com</a>
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                See you in class soon!
              </p>

              <p style="font-size: 16px; font-weight: bold;">Vic<br>Founder & Spanish Coach<br>Spanish Fluency School</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #f0f0f0; padding: 20px 30px; text-align: center; font-size: 14px; color: #666;">
              Follow us: 
              <a href="https://www.instagram.com/spanishfluencyschool" style="color: #F7931E; text-decoration: none;">Instagram</a> | 
              <a href="https://www.facebook.com/spanishfluencyschool" style="color: #F7931E; text-decoration: none;">Facebook</a> | 
              <a href="mailto:spanishfluencyschool@gmail.com" style="color: #F7931E; text-decoration: none;">Email</a><br>
              © 2025 Spanish Fluency School. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
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
