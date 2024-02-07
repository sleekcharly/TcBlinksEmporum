import * as React from 'react';

import { VerifyEmail } from '@/components/mail/verify-email/verify-email-template';
import { Resend } from 'resend';

export async function POST(req: Request) {
  // get request body
  const body = await req.json();
  const { email, token, first_name } = body;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

  const emailData = VerifyEmail({
    first_name,
    confirmLink,
  });

  const { data, error } = await resend.emails.send({
    from: 'TCBlinks <onboarding@resend.dev>',
    to: email,
    subject: 'Confirm your email',
    html: emailData,
  });

  if (error) {
    // console.error('error', error);
    return Response.json({ error });
  }

  return Response.json(data);
}
