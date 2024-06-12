import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Authenticator,
  ThemeProvider as AuthThemeProvider,
  defaultDarkModeOverride,
  View,
} from "@aws-amplify/ui-react";

import { Layout } from "@/common";
import logo from "@/assets/pilikola-logo.png";

import awsExports from "@/aws-exports";

import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import { Box } from "@mui/material";

Amplify.configure(awsExports);

const darkMuiTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const darkAuthTheme = {
  name: "dark-auth-mode",
  overrides: [defaultDarkModeOverride],
};

const components = {
  Header() {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="white"
      >
        <Image alt="pilikola-logo" src={logo} width={250} height={250} />
      </Box>
    );
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pilikola</title>
        <link rel="favicon" href="/public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AuthThemeProvider theme={darkAuthTheme} colorMode="system">
        <Authenticator
          components={components}
          loginMechanisms={["email"]}
          initialState="signIn"
          signUpAttributes={[
            "birthdate",
            "email",
            "name",
            "nickname",
            "preferred_username",
          ]}
        >
          <Authenticator.Provider>
            <MuiThemeProvider theme={darkMuiTheme}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MuiThemeProvider>
          </Authenticator.Provider>
        </Authenticator>
      </AuthThemeProvider>
    </>
  );
}
