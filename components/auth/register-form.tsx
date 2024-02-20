'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Logo from '../logo';

import * as z from 'zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Button } from '../ui/button';
import Socials from './socials';
import { register } from '@/actions/register';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { ClipLoader } from 'react-spinners';

const RegisterForm = () => {
  // pending state from react
  const [isPending, startTransition] = useTransition();

  // component state
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
  });

  // set router component
  const router = useRouter();

  // submit function
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values).then(async (data) => {
        setError(data.error);

        // send verification token email
        if (data.verificationToken) {
          const first_name = data.first_name;
          const res = await fetch(`/api/auth/verify-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: data.verificationToken.email,
              token: data.verificationToken.token,
              first_name,
            }),
          });

          if (!res.ok) {
            // throw error
            throw new Error('Failed to send verification email');
          } else {
            setSuccess('Successful! Check your email for verification!');

            setTimeout(() => {
              router.push(`${process.env.NEXTAUTH_URL}/auth/login`);
            }, 3000);
          }
        }
      });
    });
  };

  return (
    <Card className="w-[90%] mx-auto mt-5 lg:w-[600px] shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <div>
            <Logo />
          </div>

          <p className="text-sm">Welcome to TC Blinks Emporium</p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-5">
          <p className="text-xs mb-3">Create an account?</p>
          <Form {...form}>
            <form
              className="space-y-6 mb-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter your first name!"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter your last name!"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter your email!"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button
                type="submit"
                className="w-full flex items-center space-x-2"
                disabled={isPending}
              >
                <span>Register</span>
                {isPending && <ClipLoader color={'olive'} size={20} />}
              </Button>
            </form>
          </Form>
          <Socials />
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full">
          <hr className="mb-5" />

          <p className="text-xs mb-3">I have an account ?</p>

          <Button className="w-full">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
