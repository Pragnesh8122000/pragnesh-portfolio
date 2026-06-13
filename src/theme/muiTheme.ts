"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6", // Electric Blue
      light: "#adc6ff",
      dark: "#005ac2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#94a3b8", // Slate Gray
      light: "#b9c8de",
      dark: "#39485a",
      contrastText: "#10131a",
    },
    background: {
      default: "#10131a", // Deep Charcoal
      paper: "#1d2027",   // Elevation surface container
    },
    text: {
      primary: "#e1e2ec",
      secondary: "#c2c6d6",
    },
    error: {
      main: "#ffb4ab",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: {
      fontFamily: "var(--font-sora), sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "var(--font-sora), sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "var(--font-sora), sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "var(--font-sora), sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "var(--font-sora), sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "var(--font-sora), sans-serif",
      fontWeight: 600,
    },
    button: {
      fontFamily: "var(--font-inter), sans-serif",
      fontWeight: 600,
      textTransform: "none",
    },
    body1: {
      fontFamily: "var(--font-inter), sans-serif",
    },
    body2: {
      fontFamily: "var(--font-inter), sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
          },
          "&.MuiButton-containedPrimary": {
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
            "&:hover": {
              boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(30, 30, 30, 0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
            borderColor: "rgba(59, 130, 246, 0.4)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
