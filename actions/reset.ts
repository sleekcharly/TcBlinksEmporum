'use server';

import { sendPasswordResetEmail } from '@/components/mail/reset-email/send-password-reset-email';
import { getUserByEmailRef } from '@/data/User';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema } from '@/schemas';
import { getDocs } from 'firebase/firestore';
import * as z from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  // form validation
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;

  const querySnapshot = await getDocs(getUserByEmailRef(email));

  if (querySnapshot.empty) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: 'Reset email sent' };
};
