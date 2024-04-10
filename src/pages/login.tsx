import React from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      <Typography variant="h2">Hello!</Typography>
      <Typography variant="h5">Please log in or create an account</Typography>
      <Typography variant="h5" gutterBottom>
        to use this application
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="48px"
        gap="24px"
      >
        <TextField required label="Email" className="w-[35%]" />
        <TextField required label="Password" className="w-[35%]" />
        <Button variant="contained" className="w-[25%] mt-[24px]">
          Login
        </Button>
        <Box display="flex">
          <Typography>or &nbsp;</Typography>
          <Link href="/register">create an account</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
