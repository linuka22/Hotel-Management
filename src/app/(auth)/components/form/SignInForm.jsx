"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import './FormContainer.css';
import { useToast } from "@/hooks/use-toast"


const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    
    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Oops! Something not right",
      })
    } else {
      router.push('/myAccount');
      router.refresh(); // Redirect to the admin page
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='mail@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='w-full mt-6' type='submit'>
              Sign in
            </Button>
          </form>
          <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
          </div>
          <p className='text-center text-sm text-gray-600 mt-2'>
            If you don&apos;t have an account, please&nbsp;
            <Link className='text-blue-500 hover:underline' href='/sign-up'>
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;

