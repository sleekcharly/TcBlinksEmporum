'use server';

import { UserRole } from '@/lib';
import { currentRole } from '@/lib/auth';

// check if the user's role is admin to perform admin privileges
export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: 'Allowed server action!' };
  }

  return { error: 'Forbidden server action!' };
};
