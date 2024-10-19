import { ReactNode } from "react";

import Head from "next/head";
import Navbar from "./navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Spotter Rescue Service</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
