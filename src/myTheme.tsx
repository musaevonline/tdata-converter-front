import { createTheme } from "@mui/material";

export const myTheme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
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
