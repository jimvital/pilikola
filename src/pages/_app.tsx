import type { AppProps } from "next/app";
import Head from "next/head";
import { Amplify } from "aws-amplify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Authenticator } from "@aws-amplify/ui-react";

import { Layout } from "@/common";
import awsExports from "@/aws-exports";

import "@aws-amplify/ui-react/styles.css";
import "./globals.css";

Amplify.configure(awsExports);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pilikola</title>
        <link rel="favicon" href="/public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Authenticator
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
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Authenticator.Provider>
      </Authenticator>
    </>
  );
}
