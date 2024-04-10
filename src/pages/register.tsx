import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Camera, Person, PhotoCamera } from "@mui/icons-material";

const RegisterPage: React.FC = () => {
  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      <Typography variant="h2">Create an account</Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="24px"
        gap="16px"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="12px"
        >
          <Avatar className="w-[96px] h-[96px]">
            <Person className="w-[48px] h-[48px]" />
          </Avatar>
          <Button
            variant="text"
            color="secondary"
            size="small"
            startIcon={<PhotoCamera />}
          >
            Add an avatar
          </Button>
        </Box>
        <TextField required label="Name" size="small" className="w-[35%]" />
        <TextField required label="Email" size="small" className="w-[35%]" />
        <TextField required label="Password" size="small" className="w-[35%]" />
        <TextField
          required
          label="Confirm password"
          size="small"
          className="w-[35%]"
        />
        <Button variant="contained" className="w-[25%] mt-[12px]">
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
