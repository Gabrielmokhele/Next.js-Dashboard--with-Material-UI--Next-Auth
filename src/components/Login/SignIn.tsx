// SignIn.tsx
import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Alert,
  Paper,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { SignInData } from "./types";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues: SignInData = {
  email: "",
  password: "",
};

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#04dead",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#04dead",
  },
};

const SignIn = () => {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (
    values: SignInData,
    actions: FormikHelpers<SignInData>
  ) => {
    setError(null);
    try {
      const result = await signIn("credentials", {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        router.push("/dashboard");
      }
    }
    actions.setSubmitting(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Sign In
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        {({ isSubmitting, handleChange, values, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default SignIn;
