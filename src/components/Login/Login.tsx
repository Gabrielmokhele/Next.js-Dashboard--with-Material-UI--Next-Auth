import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@mui/material';

const Login = () => {
  const { data: session } = useSession();
  

  if(session) {
    return <>
    <Button variant="contained" color="error" onClick={() => signOut()}>Sign out</Button>
    </>    
  }
  return <>
  <Button variant="contained" color="success" onClick={() => signIn()}>Sign in</Button>
  </>
}

export default Login;