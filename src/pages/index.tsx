import React from "react";
import Head from "next/head";

import { Home } from "@/home";

const Main: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pilikola</title>
        <link rel="favicon" href="/public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Home />
    </>
  );
};

export default Main;
