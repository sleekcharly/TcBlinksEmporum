'use server';

import { signIn } from '@/auth';
import { getUserByEmailRef } from '@/data/User';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { getDocs } from 'firebase/firestore';
import { AuthError } from 'next-auth';
import * as z from 'zod';

// login function
export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  // validate form fields
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  // get validated fields.
  const { email, password } = validatedFields.data;

  // check existing user in database
  const userQuerySnapshot = await getDocs(getUserByEmailRef(email));

  const existingUser = userQuerySnapshot.docs[0].data();

  if (
    userQuerySnapshot.empty ||
    !existingUser.email ||
    !existingUser.password
  ) {
    return { error: 'Email does not exist!' };
  }

  // login in user
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }

  return { success: 'Logged in successfully' };
};
