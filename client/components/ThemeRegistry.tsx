"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";

import { maintenxTheme } from "../theme";

type ThemeRegistryProps = {
  children: ReactNode;
};

export function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <ThemeProvider theme={maintenxTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
