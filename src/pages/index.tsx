import Head from "next/head";
import Dashboard from "./dashboard";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import { useSession } from 'next-auth/react';
import Login from "@/components/Login";
import scss from "../pages/Home.module.scss";



const Home = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>DataBit - Dashboard</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={scss.main}>
        <Header />
        {
          session && (
            <>
              <SideMenu/>
              <Dashboard/>
            </>
          )
        }
        <Login/>
        
      </main>
    </>
  );
}

export default Home;
