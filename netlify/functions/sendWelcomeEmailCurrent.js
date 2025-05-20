// netlify/functions/sendWelcomeEmailCurrent.js
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
  <title>Welcome to the new Spanish Fluency School platform</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <!-- HEADER -->
          <tr>
            <td style="background-color:rgb(209, 124, 26); padding: 20px 30px;">
              <h1 style="text-align: center; margin: 0; color: #ffffff; font-size: 24px;">Welcome to Your New Dashboard!</h1>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; line-height: 1.6;">Hi ${firstName},</p>

              <p style="font-size: 16px; line-height: 1.6;">
                I’m happy to welcome you to the new platform at <strong>Spanish Fluency School</strong> — a space created to support your journey toward fluency.
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                Thanks to your support and consistency, this project keeps growing. The new website, dashboard, and updated materials are designed to make your learning experience more comfortable, more practical, and hopefully even more enjoyable.
              </p>

              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

              <h3 style="color: rgb(209, 124, 26);">✨ What you’ll find in your Dashboard:</h3>
              <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px;">
                <li>📅 Schedule and reschedule your classes easily</li>
                <li>🎥 Access your Zoom classroom link</li>
                <li>📁 Open your personal Google Drive folder</li>
                <li>📚 Explore creative practice materials</li>
                <li>💳 Make payments</li>
              </ul>

              <p style="font-size: 16px; line-height: 1.6;">
                Everything you need — all in one place — so you can focus on what matters: speaking Spanish with confidence.
              </p>

              <p style="text-align: center; margin: 30px 0;">
                <a href="https://spanishfluencyschool.com/dashboard" style="background-color: #007BFF; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Access My Dashboard</a>
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                Thank you for being part of these improvements.
              </p>

              <p style="font-size: 16px; font-weight: bold;">Vic<br>Founder & Spanish Coach<br>Spanish Fluency School</p>
            </td>
          </tr>

          <p style="font-size: 13px; line-height: 1.4;">
                Please note: this is an automatic email. If you need help or have any questions, feel free to contact me at:  
                <a href="mailto:spanishfluencyschool@gmail.com" style="color:rgb(8, 86, 168);">spanishfluencyschool@gmail.com</a>
              </p>

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
