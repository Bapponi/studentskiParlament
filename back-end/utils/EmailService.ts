import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g., smtp.gmail.com for Gmail
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'studentski.parlament.etf@gmail.com', // your email
      pass: 'sifra123', // your email password
    },
  });

  const mailOptions = {
    from: '"Studentski Parlament ETF-a" <studentski.parlament.etf@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Успешно послат мејл');
  } catch (error) {
    console.error('Грешка приликом слања мејла:', error);
    throw new Error('Грешка приликом слања мејла');
  }
};
