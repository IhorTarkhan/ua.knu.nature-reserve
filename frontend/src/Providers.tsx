import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ReactElement } from "react";
import CssBaseline from "@mui/material/CssBaseline";

export const Providers = ({ children }: { children: ReactElement }) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
