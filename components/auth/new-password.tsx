'use client';

import { cn } from '@/lib/utils';
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Poppins } from 'next/font/google';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '../ui/button';
import { newPassword } from '@/actions/new-password';
import { ClipLoader } from 'react-spinners';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  // extract token from search parameters
  const token = searchParams.get('token');

  // get pending and transition states
  const [isPending, startTransition] = useTransition();

  // component state
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  // submit function
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token).then((data) => {
        data.success ? setSuccess(data?.success) : setError(data?.error);
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`);
        }, 2500);
      });
    });
  };

  return (
    <Card className="w-[90%] md:w-[600px] shadow-md dark:bg-gray-100 dark:text-gray-900  mx-5 my-auto md:mx-auto">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1
            className={cn(
              'text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold',
              font.className,
            )}
          >
            🗝️ Reset your password?
          </h1>

          <p className="text-sm md:text-base lg:text-xl">
            Enter a new password.{' '}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm lg:text-base">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        className="dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button
                type="submit"
                className="w-full dark:bg-blue-500 font-bold flex items-center space-x-2"
                disabled={isPending}
              >
                <span>Reset Password</span>
                {isPending && <ClipLoader size={20} color={'aqua'} />}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
