// server action for registering a new user
'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { RegisterSchema } from '@/schemas';
import { addDoc, getDocs, collection } from 'firebase/firestore';
import { getUserByEmailRef } from '@/data/User';
import { db } from '@/lib/firebase';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // validate form fields
  const validatedFields = RegisterSchema.safeParse(values);

  // return error if there are validation issues
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, first_name, last_name } = validatedFields.data;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const querySnapshot = await getDocs(getUserByEmailRef(email));

  if (!querySnapshot.empty) {
    return { error: 'Email already in use!' };
  }

  try {
    await addDoc(collection(db, 'users'), {
      name: first_name + ' ' + last_name,
      email,
      password: hashedPassword,
      isOAuth: false,
      image: '',
      role: 'USER',
    });
  } catch (err) {
    return { error: 'Something went wrong' };
  }

  // generate token for email verification
  const verificationToken = await generateVerificationToken(email);

  // send verification token email
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    first_name,
  );

  return { success: 'Successful! Check your email for verification' };
};
