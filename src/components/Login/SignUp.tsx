// SignUp.tsx
import React from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { SignUpData, SignUpResponse } from "./types";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  user_type: Yup.string().required("User type is required"),
  role: Yup.string().required("Role is required"),
});

const initialValues: SignUpData = {
  username: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  user_type: "",
  role: "",
};

const SignUp = () => {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const signUpMutation = useMutation<SignUpResponse, Error, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      try {
        const response = await axios.post("http://localhost:5000/signup", data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Failed to sign up.");
        }
        throw new Error("An unexpected error occurred.");
      }
    },
    onSuccess: async (data, variables) => {
      console.log("Sign-up successful:", data);
      const result = await signIn("credentials", {
        redirect: true,
        email: variables.email,
        password: variables.password,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        console.error("Sign-in failed:", result.error);
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Sign-up failed:", error.message);
    },
  });

  const handleSignUp = async (
    values: SignUpData,
    actions: FormikHelpers<SignUpData>
  ) => {
    setError(null);
    try {
      await signUpMutation.mutateAsync(values);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
    actions.setSubmitting(false);
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        height: '90%',
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          mb: 4,
          color: '#333',
          fontSize: '2rem',
          fontWeight: 500
        }}
      >
        Sign Up
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting, handleChange, values, errors, touched }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextField
                name="username"
                label="Username *"
                fullWidth
                value={values.username}
                onChange={handleChange}
                variant="outlined"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                name="surname"
                label="Surname *"
                fullWidth
                value={values.surname}
                onChange={handleChange}
                variant="outlined"
                error={touched.surname && Boolean(errors.surname)}
                helperText={touched.surname && errors.surname}
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                name="email"
                label="Email *"
                fullWidth
                value={values.email}
                onChange={handleChange}
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                name="password"
                label="Password *"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                variant="outlined"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password *"
                type="password"
                fullWidth
                value={values.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                name="user_type"
                label="User Type *"
                fullWidth
                value={values.user_type}
                onChange={handleChange}
                variant="outlined"
                error={touched.user_type && Boolean(errors.user_type)}
                helperText={touched.user_type && errors.user_type}
                sx={{ backgroundColor: 'white' }}
              />
              <TextField
                name="role"
                label="Role *"
                fullWidth
                value={values.role}
                onChange={handleChange}
                variant="outlined"
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
                sx={{ backgroundColor: 'white' }}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                sx={{
                  mt: 1,
                  py: 1.5,
                  backgroundColor: '#00e676',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#00c853',
                  },
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUp;