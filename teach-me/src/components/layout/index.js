import React from "react";
import Head from "next/head";
import styles from "./index.module.scss";
import Notification from "../UI/notification";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notification.Element />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
