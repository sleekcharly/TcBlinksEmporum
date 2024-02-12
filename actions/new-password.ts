'use server';

import { getPasswordResetTokenByTokenRef } from '@/data/Token';
import { getUserByEmailRef } from '@/data/User';
import { NewPasswordSchema } from '@/schemas';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/firebase';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Missing token!' };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { password } = validatedFields.data;

  // get token snapshot
  const tokenSnapshot = await getDocs(getPasswordResetTokenByTokenRef(token));

  if (tokenSnapshot.empty) {
    return { error: 'Invalid token!' };
  }

  const existingToken = tokenSnapshot.docs[0].data();

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const userSnapshot = await getDocs(getUserByEmailRef(existingToken.email));

  if (userSnapshot.empty) {
    return { error: 'Email does not exist!' };
  }

  const existingUser = userSnapshot.docs[0].data();

  const hashedPassword = await bcrypt.hash(password, 10);

  // update user document
  const usersCollection = collection(db, 'users');
  const userRef = doc(usersCollection, existingUser.id);

  await updateDoc(userRef, {
    password: hashedPassword,
  });

  // delete password reset token
  const resetTokenCollection = collection(db, 'passwordResetToken');
  const tokenRef = doc(resetTokenCollection, existingToken.id);

  await deleteDoc(tokenRef);

  return { success: 'Password updated successfully!' };
};
