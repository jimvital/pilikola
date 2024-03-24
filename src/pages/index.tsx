import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Layout } from "@/common";

import "./index.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
};

export default Home;
