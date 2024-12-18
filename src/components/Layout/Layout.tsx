import React, { useState } from 'react';
import scss from "../../pages/Home.module.scss";
import { useSession } from 'next-auth/react';
import SideMenu from '../SideMenu';
import Head from "next/head";

const drawerWidth = 240;

const Layout = (props: any) => {
    const {data: session} = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuOpenChange = (open: boolean) => {
        setIsMenuOpen(open);
    };

  return (
    <>
     <Head>
        <title>DataBit - Data Dashboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    <main className={scss.layout} style={{
        position: 'relative',
        transition: 'padding-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        paddingLeft: session && isMenuOpen ? `${drawerWidth}px` : '0px'
    }}>
        {session && <SideMenu onOpenChange={handleMenuOpenChange} />}
        {props.children}
    </main>
    </>
  )
}

export default Layout;