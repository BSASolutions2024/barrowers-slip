import nodemailer from 'nodemailer'

export async function POST(req:any, res:any) {
    const { to, subject, text, html } = await req.json();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
      }
    try {
        // Create a transporter using Outlook SMTP settings
        const transporter = nodemailer.createTransport({
          host: 'smtp-mail.outlook.com',  // Outlook SMTP server
          port: 587,                   // SMTP port for Office 365
          secure: false,               // TLS is required, so 'secure' must be false
          auth: {
            user: process.env.OUTLOOK_USER,    // Your Outlook email address
            pass: process.env.OUTLOOK_PASS,    // Your Outlook password or App Password
          },
          tls: {
            ciphers: 'SSLv3',  // In some cases, this may be necessary for SSL compatibility
          },
        });
    
        // Send the email
        const info = await transporter.sendMail({
          from: process.env.OUTLOOK_USER,  // Sender email
          to,                              // Recipient email
          subject,                         // Subject line
          text,                            // Plain text body
          html,                            // HTML body (optional)
        });
    
        return new Response(JSON.stringify({ message: 'Email sent successfully', info }), {
          status: 200,
        });
      } catch (error) {
        console.error('Error sending email:', error);
        return new Response(
          JSON.stringify({ message: 'Failed to send email', error: error }),
          { status: 500 }
        );
      }
}