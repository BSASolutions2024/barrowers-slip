import nodemailer from 'nodemailer'

export async function POST(req:any) {
    // if (req.method !== 'POST') {
    //     return res.status(405).json({ message: 'Method not allowed' });
    // }

    try {
        const { to, subject, text, html } = await req.json();
    
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
    
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to,
          subject,
          text,
          html,
        });
    
        return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Failed to send email:', error);
        return new Response(JSON.stringify({ message: 'Failed to send email', error }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
}