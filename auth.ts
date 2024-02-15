// authentication configuration file

import NextAuth from 'next-auth';
import { adminAuth, adminDb } from './lib/firebase-admin';
import { FirestoreAdapter } from '@auth/firebase-adapter';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getUserByIdRef } from './data/User';

import { UserRole } from './lib';
import { db } from './lib/firebase';

import authConfig from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      // update user document
      const usersCollection = collection(db, 'users');
      const userRef = doc(usersCollection, user.id);

      await updateDoc(userRef, {
        emailVerified: new Date(),
        role: 'USER',
        isOAuth: true,
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') {
        return true;
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        // append firebase token
        const firebaseToken = await adminAuth.createCustomToken(token.sub);
        session.firebaseToken = firebaseToken;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const userQuerySnapshot = await getDoc(getUserByIdRef(token.sub));

      if (!userQuerySnapshot.exists()) return token;

      const existingUser = userQuerySnapshot.data();

      token.isOAuth = existingUser.isOAuth;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: FirestoreAdapter(adminDb),
  session: { strategy: 'jwt' },
  ...authConfig,
});
