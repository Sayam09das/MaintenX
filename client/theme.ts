import { createTheme } from "@mui/material/styles";

export const maintenxTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E0B15D",
    },
    secondary: {
      main: "#4DD0E1",
    },
    background: {
      default: "#0A1018",
      paper: "#111926",
    },
    success: {
      main: "#34D399",
    },
    warning: {
      main: "#FBBF24",
    },
    error: {
      main: "#FB7185",
    },
    text: {
      primary: "#F5F7FA",
      secondary: "#A7B1C2",
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
    h1: {
      fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at top, rgba(224, 177, 93, 0.16), transparent 30%), linear-gradient(180deg, #131B28 0%, #0A1018 100%)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
  },
});
