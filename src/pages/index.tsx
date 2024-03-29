import React from "react";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Pilikola</title>
        <link rel="favicon" href="/public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </div>
  );
};

export default Home;
