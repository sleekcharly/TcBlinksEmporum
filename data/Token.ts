import { db } from '@/lib/firebase';

import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  query,
  where,
} from 'firebase/firestore';

interface TokenProps {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export const tokenConverter: FirestoreDataConverter<TokenProps> = {
  toFirestore: function (token: TokenProps): DocumentData {
    return {
      id: token.id,
      email: token.email,
      token: token.token,
      expires: token.expires,
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): TokenProps {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      email: data.email,
      token: data.token,
      expires: data.expires,
    };
  },
};

export const getVerificationTokenByEmailRef = (email: string) =>
  query(
    collection(db, 'verificationToken'),
    where('email', '==', email),
  ).withConverter(tokenConverter);

export const getVerificationTokenByIdRef = (id: string) =>
  query(
    collection(db, 'verificationToken'),
    where('id', '==', id),
  ).withConverter(tokenConverter);

export const getVerificationTokenByTokenRef = (token: string) =>
  query(
    collection(db, 'verificationToken'),
    where('token', '==', token),
  ).withConverter(tokenConverter);

export const getPasswordResetTokenByEmailRef = (email: string) =>
  query(
    collection(db, 'passwordResetToken'),
    where('email', '==', email),
  ).withConverter(tokenConverter);

export const getPasswordResetTokenByTokenRef = (token: string) =>
  query(
    collection(db, 'passwordResetToken'),
    where('token', '==', token),
  ).withConverter(tokenConverter);
