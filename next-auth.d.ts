import NextAuth, { type DefaultSession } from 'next-auth';
import { UserRole } from './lib';

export type ExtendedUser = DefaultSession['user'] & {
  isOAuth: boolean;
  password?: string;
  role: UserRole;
};

// add id to the user object of the session interface
declare module 'next-auth' {
  interface Session {
    firebaseToken?: string;
    user: ExtendedUser;
  }
}
