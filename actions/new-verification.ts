'use server';

import { getVerificationTokenByTokenRef } from '@/data/Token';
import { getUserByEmailRef } from '@/data/User';
import { db } from '@/lib/firebase';
import {
  getDocs,
  doc,
  updateDoc,
  collection,
  deleteDoc,
} from 'firebase/firestore';

export const newVerification = async (token: string) => {
  const tokenSnapshot = await getDocs(getVerificationTokenByTokenRef(token));

  if (tokenSnapshot.empty) {
    return { error: 'Token does not exist!' };
  }

  const existingToken = tokenSnapshot.docs[0].data();

  // check if token has expired
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  // get token user
  const userSnapshot = await getDocs(getUserByEmailRef(existingToken.email));

  const existingUser = userSnapshot.docs[0].data();

  if (userSnapshot.empty) {
    return { error: 'Email does not exist!' };
  }

  // update user document
  const usersCollection = collection(db, 'users');
  const userRef = doc(usersCollection, existingUser.id);

  await updateDoc(userRef, {
    emailVerified: new Date(),
    email: existingToken.email,
  });

  // delete token
  const tokenCollection = collection(db, 'verificationToken');
  const tokenRef = doc(tokenCollection, existingToken.id);

  await deleteDoc(tokenRef);

  return { success: 'Email verified!' };
};
