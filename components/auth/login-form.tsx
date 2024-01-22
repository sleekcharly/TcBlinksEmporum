'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Logo from '../logo';

import * as z from 'zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';
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

const LoginForm = () => {
  // search parameters from url
  const searchParams = useSearchParams();

  // pending state from react
  const [isPending, startTransition] = useTransition();

  // component state
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <div>
            <Logo />
          </div>

          <p className="text-sm">Welcome to TC Blinks Emporium</p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-10">
          <p className="text-xs mb-3">I already have an account?</p>
          <Form {...form}>
            <form className="space-y-6 mb-3">
              <div className="space-y-4">
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
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href="/auth/reset" className="text-sm">
                            Forgot password?
                          </Link>
                        </Button>
                      </FormItem>
                    </>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                Sign in
              </Button>
            </form>
          </Form>
          <Socials />
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full">
          <hr className="mb-10" />

          <p className="text-xs mb-3">I don't have an account ?</p>
          <p className="text-sm mb-5">
            Enjoy added benefits and a richer experience by creating a personal
            account
          </p>

          <Button className="w-full">Create My Account</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
