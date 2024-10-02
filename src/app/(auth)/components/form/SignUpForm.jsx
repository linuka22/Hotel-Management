'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import './Signupform.css'; // Import the CSS file

const FormSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    phoneNumber: z.string().min(10, 'Phone number must have at least 10 digits'),
    nicNumber: z.string().min(10, 'NIC number must have at least 10 characters'),
    address: z.string().min(1, 'Address is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      nicNumber: '',
      address: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
          nicNumber: values.nicNumber,
          address: values.address,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push('/sign-in');
      } else {
        setError(result.message); // Set the error message to display
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="form-group">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Re-Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="nicNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIC Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your NIC number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="btn-submit" type="submit">
              Sign up
            </Button>
          </form>
          <div className="separator">
            or
          </div>
          <p className="form-footer">
            If you already have an account, please{' '}
            <Link className="link-signin" href="/sign-in">
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
