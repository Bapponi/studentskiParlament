import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'studentskiparlament@etf.rs',
      pass: 'pmmb iuuv jmof njkr',
    },
  });

  const mailOptions = {
    from: '"Studentski Parlament ETF-a"',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Успешно послат мејл');
  } catch (error) {
    console.error('Грешка приликом слања мејла:', error);
    throw new Error('Грешка приликом слања мејла');
  }
};
