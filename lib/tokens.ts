import {
  getPasswordResetTokenByEmailRef,
  getVerificationTokenByEmailRef,
  tokenConverter,
} from '@/data/Token';
import crypto from 'crypto';
import { deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from './firebase';

export const generateVerificationToken = async (email: string) => {
  // generate random string
  const token = uuidv4();

  // generate random id;
  const tokenId = uuidv4();

  // set one hour expiry
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const querySnapshot = await getDocs(getVerificationTokenByEmailRef(email));

  if (!querySnapshot.empty) {
    const existingToken = querySnapshot.docs[0].data();

    await deleteDoc(doc(db, 'verificationToken', existingToken.id));
  }

  // set ref for verification token
  const verificationTokenRef = doc(
    db,
    'verificationToken',
    tokenId,
  ).withConverter(tokenConverter);

  await setDoc(verificationTokenRef, {
    id: tokenId,
    email,
    token: token,
    expires,
  });

  const verificationToken = {
    id: tokenId,
    email,
    token,
    expires,
  };

  return verificationToken;
};

// generate password reset token
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

  // generate random id;
  const tokenId = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const tokenQuerySnapshot = await getDocs(
    getPasswordResetTokenByEmailRef(email),
  );

  if (!tokenQuerySnapshot.empty) {
    const existingToken = tokenQuerySnapshot.docs[0].data();

    await deleteDoc(doc(db, 'passwordResetToken', existingToken.id));
  }

  // set ref for password reset token
  const passwordResetTokenRef = doc(
    db,
    'passwordResetToken',
    tokenId,
  ).withConverter(tokenConverter);

  await setDoc(passwordResetTokenRef, {
    id: tokenId,
    email,
    token,
    expires,
  });

  const passwordResetToken = {
    id: tokenId,
    email,
    token,
    expires,
  };

  return passwordResetToken;
};
