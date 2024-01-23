import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required!',
  }),
  password: z.string().min(1, { message: 'Password is required!' }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required!',
  }),
  password: z.string().min(6, { message: 'Minimum 6 characters required!' }),
  first_name: z.string().min(1, { message: 'lPease enter your first name' }),
  last_name: z.string().min(1, { message: 'Please enter your last name' }),
});
