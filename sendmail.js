const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // SMTP server hostname
  port: 587, // Port number (usually 587 for SMTP)
  secure: false, // true for 465, false for other ports; if true, use SSL
  auth: {
    user: 'nexumbft@gmail.com', // Your email address
    pass: 'nanp xpaw hfxa rxxi', // Your email password
  },
});

// Function to send an email
exports.sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: 'nexumbft@gmail.com', // Sender's email address
      to, // Receiver's email address
      subject, // Subject line
      text, // Plain text body
      html, // HTML body
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw error;
  }
};

// Example usage:
const toEmail = 'harsh.dubey@bytesfarms.com';
const emailSubject = 'Test Email';
const emailText = 'This is a test email sent from Node.js using SMTP!';
const emailHTML = '<p>This is a test email sent from <b>Node.js</b> using <i>SMTP</i>!</p>';

