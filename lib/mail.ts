import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  first_name: string,
) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: ` 
        <p>Dear ${first_name}</p>

        <p>Thank you for signing up for TCBlinks Emporium. We're excited to have you on board.

        <p>Click <a href="${confirmLink}">here</a> to confirm email and enjoy amazing benefits</p>

        <p>Thank you once again</p>

        <p>Best regards</p>
    `,
  });
};
