import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, TextField, Box, Typography, Grid, Container, Alert } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useSession, signIn, signOut } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

type SignUpData = {
  username: string;
  user_type: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
};


type SignInData = {
  email: string;
  password: string;
  confirmPassword?: never;
  username?: never;
  user_type?: never;
  role?: never;
};

type FormData = SignUpData | SignInData;

interface SignUpResponse {
  message: string;
  token: string;
}

const Login = () => {
  const { data: session } = useSession();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const signUpMutation = useMutation<SignUpResponse, Error, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      try {
        const response = await axios.post('http://localhost:5000/signup', data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || 'Failed to sign up.');
        } else {
          throw new Error('An unexpected error occurred.');
        }
      }
    },
    onSuccess: async (data, variables) => {
      console.log('Sign-up successful:', data);
      
      const result = await signIn('credentials', {
        redirect: true,
        email: variables.email, 
        password: variables.password, 
        callbackUrl: '/dashboard', 
      });
  
      if (result?.error) {
        console.error('Sign-in failed:', result.error);
      } else {
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      console.error('Sign-up failed:', error.message);
    },
  });
  

  const handleSignUp = async (values: SignUpData, actions: FormikHelpers<SignUpData>) => {
    setError(null);
    try {
      await signUpMutation.mutateAsync(values);
      router.push('/dashboard'); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
    actions.setSubmitting(false);
  };

  const handleSignIn = async (values: SignInData, actions: FormikHelpers<SignInData>) => {
    setError(null);
    try {
      const result = await signIn('credentials', {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl: '/dashboard', 
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }  else {

        router.push('/dashboard');
      }
    }
    actions.setSubmitting(false);
  };


  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#04dead',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#04dead',
    },
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {!session ? (
        <>
          <Typography variant="h4" gutterBottom>
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Formik<FormData>
            initialValues={
              isSigningUp
                ? { username: '', email: '', password: '', confirmPassword: '', user_type: '', role: '' }
                : { email: '', password: '' }
            }
            validationSchema={
              isSigningUp
                ? Yup.object({
                  username: Yup.string().required('Username is required'),
                  email: Yup.string().email('Invalid email').required('Email is required'),
                  password: Yup.string().required('Password is required'),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password')], 'Passwords must match')
                    .required('Confirm Password is required'),
                  user_type: Yup.string().required('User type is required'),
                  role: Yup.string().required('Role is required'),
                })
                : Yup.object({
                    email: Yup.string().email('Invalid email').required('Email is required'),
                    password: Yup.string().required('Password is required'),
                  })
            }
            onSubmit={(values, actions) =>
              isSigningUp ? handleSignUp(values as SignUpData, actions as FormikHelpers<SignUpData>) : handleSignIn(values as SignInData, actions as FormikHelpers<SignInData>)
            }
          >
            {({ isSubmitting, handleChange, values }) => (
              <Form>
                <Box sx={{ width: '100%', maxWidth: 400, mt: 3 }}>
                  <Grid container spacing={2}>
                    {isSigningUp && (
                      <Grid item xs={12}>
                        <TextField
                          name="username"
                          label="User name"
                          fullWidth
                          value={values.username || ''}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          sx={{ ...textFieldStyles }}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{ ...textFieldStyles }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        label="Password"
                        fullWidth
                        type="password"
                        value={values.password || ''}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{ ...textFieldStyles }}
                      />
                    </Grid>
                    {isSigningUp && (
                      <Grid item xs={12}>
                        <TextField
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          fullWidth
                          value={values.confirmPassword || ''}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          sx={{ ...textFieldStyles }}
                        />
                      </Grid>
                    )}
                    {isSigningUp && (
                    <Grid item xs={12}>
                      <TextField
                        name="user_type"
                        label="User Type"
                        fullWidth
                        value={values.user_type || ''}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{ ...textFieldStyles }}
                      />
                    </Grid>
                  )}
                    {isSigningUp && (
                    <Grid item xs={12}>
                      <TextField
                        name="role"
                        label="Role"
                        fullWidth
                        value={values.role || ''}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{ ...textFieldStyles }}
                      />
                    </Grid>
                    )}
                   
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        disabled={isSubmitting}
                      >
                        {isSigningUp ? 'Sign Up' : 'Sign In'}
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="button"
                        variant="outlined"
                        fullWidth
                        onClick={() => setIsSigningUp(!isSigningUp)}
                      >
                        {isSigningUp
                          ? 'Already have an account? Sign In'
                          : "Don't have an account? Sign Up"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <Box textAlign="center">
          <Button variant="contained" color="error" onClick={() => signOut()}>
            Sign out
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Login;
