import React from 'react';
import scss from "../../pages/Home.module.scss";
import { useSession } from 'next-auth/react';
import SideMenu from '../SideMenu';
import Head from "next/head";
import Footer from '../Footer';

const Layout = (props: any) => {
    const {data: session} = useSession();

  return (
    <>
     <Head>
        <title>DataBit - Data Dashboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    <main className={scss.layout}>
        {session && <SideMenu />}
        {props.children}
        <Footer/>
    </main>
    </>
  )
}

export default Layout;
