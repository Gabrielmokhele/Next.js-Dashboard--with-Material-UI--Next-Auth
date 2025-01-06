import React from "react";
import Login from "@/components/Login";
import Box from "@mui/material/Box";

const SignIn = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login />
    </Box>
  );
};

export default SignIn;
