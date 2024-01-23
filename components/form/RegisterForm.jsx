"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();
  const [isDisabled, setDisabled] = useState(false);

  const FormSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),

  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setDisabled(true)
    // Perform your registration logic here
    const { name, email, password } = values;

    try {
      // Call your API or authentication service to register the user
      // For example, you might use an API route to handle registration
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Registration successful, now log in the user
        form.reset();
        toast.success("Registration success!");
      } else {
        // Handle registration error
        toast.error("Registration failed");
        console.error('Registration failed');
      }
    } catch (error) {
      toast.error("Error during registration");
      console.error('Error during registration:', error);
    } finally {
      setDisabled(false)
    }
  };

  return (
    <Form {...form}>
      <h1 className="text-white text-center">Sign up</h1> 
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mt-10'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Name' {...field} />
                </FormControl>
                <FormMessage className="mt-2 text-red-400"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="mt-6" placeholder='Email' {...field} />
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
        </div>
        <Button className='w-full mt-6' type='submit' disabled={isDisabled}>
          Sign up
        </Button>
      </form>
      <div className='text-white mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <p className='text-center text-sm mt-2 text-white'>
        If you already have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/'>
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;