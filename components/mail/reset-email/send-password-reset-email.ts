import { Resend } from 'resend';
import { ResetPassword } from './reset-password-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'TC Blinks <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: ResetPassword({ resetLink }),
  });
};
