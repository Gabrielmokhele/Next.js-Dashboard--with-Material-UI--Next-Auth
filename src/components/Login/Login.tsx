// AuthLayout.tsx
import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login = () => {
  const { data: session } = useSession();
  const [isSigningUp, setIsSigningUp] = React.useState(false);

  if (session) {
    return (
      <Box 
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(862px at 6% 18%, rgb(61, 182, 139) 45%, rgb(21, 219, 149) 95%)"
        }}
      >
        <Button variant="contained" color="error" onClick={() => signOut()}>
          Sign out
        </Button>
      </Box>
    );
  }

  if (isSigningUp) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(862px at 6% 18%, rgb(61, 182, 139) 45%, rgb(21, 219, 149) 95%)",
          p: 3
        }}
      >
        <SignUp />
        <Button
          variant="text"
          onClick={() => setIsSigningUp(false)}
          sx={{ 
            mt: 2,
            color: 'white',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          Already have an account? Sign In
        </Button>
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "radial-gradient(862px at 6% 18%, rgb(61, 182, 139) 45%, rgb(21, 219, 149) 95%)",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "70vh",
          mt: 15,
          backgroundColor: "#f0f0f0",
          width: 1200,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            ml: 5,
          }}
        >
          <Box textAlign="center">
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Sign in to access your account
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <SignIn />
          <Button
            variant="outlined"
            onClick={() => setIsSigningUp(true)}
            sx={{ mt: 2, width: "100%", maxWidth: 400 }}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default Login;