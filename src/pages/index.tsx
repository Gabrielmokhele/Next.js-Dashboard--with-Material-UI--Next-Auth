import Dashboard from "./dashboard";
import SideMenu from "../components/SideMenu";
import { useSession } from 'next-auth/react';
import Login from "@/components/Login";
import scss from "../pages/Home.module.scss";



const Home = () => {
  const { data: session } = useSession();

  return (
      <main className={scss.main}>
        {session && <Dashboard/>}
        {!session && <Login/>}
      </main>
  );
}

export default Home;
