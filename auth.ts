// authentication configuration file

import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';

import NextAuth from 'next-auth';
import { adminAuth, adminDb } from './lib/firebase-admin';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { LoginSchema } from './schemas';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getUserByEmailRef, getUserByIdRef } from './data/User';
import bcrypt from 'bcryptjs';
import { UserRole } from './lib';
import { db } from './lib/firebase';

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

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

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

      const userQuerySnapshot = await getDocs(getUserByIdRef(token.sub));

      if (userQuerySnapshot.empty) return token;

      const existingUser = userQuerySnapshot.docs[0].data();

      const accountQuerySnapshot = await getDocs(
        query(
          collection(db, 'accounts'),
          where('userId', '==', existingUser.id),
        ),
      );

      const existingAccount = accountQuerySnapshot.docs[0].data();

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: FirestoreAdapter(adminDb),
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const querySnapshot = await getDocs(getUserByEmailRef(email));

          const user = querySnapshot.docs[0].data();

          if (querySnapshot.empty || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
});
