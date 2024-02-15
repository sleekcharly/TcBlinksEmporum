import { UserRole } from '@/lib';
import { db } from '@/lib/firebase';

import { ExtendedUser } from '@/next-auth';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  doc,
  query,
  where,
} from 'firebase/firestore';

const userConverter: FirestoreDataConverter<ExtendedUser> = {
  toFirestore: function (customer: ExtendedUser): DocumentData {
    return {
      email: customer.email,
      image: customer.image,
      name: customer.name,
      password: customer.password,
      role: customer.role as UserRole,
    };
  },

  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): ExtendedUser {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      email: data.email,
      image: data.image,
      name: data.name,
      isOAuth: data.isOAuth,
      password: data.password,
      role: data.role,
    };
  },
};

export const getUserByEmailRef = (email: string) =>
  query(collection(db, 'users'), where('email', '==', email)).withConverter(
    userConverter,
  );

export const getUserByIdRef = (id: string) =>
  doc(db, 'users', id).withConverter(userConverter);
