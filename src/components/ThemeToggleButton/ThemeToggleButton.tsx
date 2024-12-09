import React, { useContext } from "react";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from "../../pages/_app";





const ThemeToggleButton = () => {
  const theme = useTheme();
  const mobileCheck = useMediaQuery("(max-width: 500px)"); 
  const colorMode = useContext(ColorModeContext);

  console.log(colorMode);


  if (!colorMode) {
    return null;
  }

  return (
    <>
      {mobileCheck && (
        <Typography>{theme.palette.mode}</Typography>
      )}
      <IconButton
        sx={{ mr: 2 }}
        title={theme.palette.mode + ' mode'}
        aria-label={theme.palette.mode + ' mode button'}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </>
  );
};

export default ThemeToggleButton;
