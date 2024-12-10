import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline} from "@mui/material";
import React, { useMemo, useState } from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  }), []);
  

  const darkThemeChosen = useMemo(
    () =>
      createTheme({
       ...darkTheme,
      }),
    []
  );

  const lightThemeChosen = useMemo(
    () =>
      createTheme({
       ...lightTheme,
      }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen}>
        <SessionProvider session={session}>
          <CssBaseline />
          <Header/>
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
