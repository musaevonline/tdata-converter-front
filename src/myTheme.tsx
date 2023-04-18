import { createTheme } from "@mui/material";

export const myTheme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: "initial",
          boxShadow: "none !important;",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "::placeholder": {
            color: "#a9a9a9",
          },
        },
      },
    },
  },
});
