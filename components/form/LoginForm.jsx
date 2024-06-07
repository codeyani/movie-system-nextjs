"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';


const LoginForm = () => {
  const [isDisabled, setDisabled] = useState(false);

  const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setDisabled(true)

    const { email, password } = values;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: "/"
      });
      
      if (result.ok) {
        toast.success("Login sucess!");
      } else {
        setDisabled(false)
        toast.error("Invalid email and password.");
      }
    } catch (error) {
      setDisabled(false)
      toast.error("Invalid email and password.");
    }
  };

  return (
    <Form {...form}>
      <h1 className="text-white text-center">Sign in</h1>
      <p>Username: user@example.com</p>
      <p>Password: qwer1234</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mt-10'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage className="mt-2 text-red-400"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="mt-6"
                    type='password'
                    placeholder='Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage className="mt-2 text-red-400"/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='remember_me'
            render={({ field }) => (
              <FormItem className="text-center">
                <FormControl>
                  <Checkbox
                    className="mt-6"
                    {...field}
                  />
                </FormControl>
                <FormLabel className="text-base ml-2 text-white">Remember me</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full h-14 mt-6' type='submit' disabled={isDisabled}>
          Sign in
        </Button>
      </form>
      <div className='text-white mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>

      <p className='text-center text-sm text-white mt-2 '>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-600 hover:underline' href='/pages/register'>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;