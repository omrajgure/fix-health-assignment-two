import React from "react";
import { createTheme } from "@mui/material";
export const ThemeCustom = createTheme({
  palette: {
    primary: {
      main: "#008b8b",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "lightgray",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          color: "white",
        },
        underline: {
          "&:before": {
            borderBottomColor: "white",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        colorPrimary: {
          color: "white",
        },
      },
    },
  },
  label: {
    color: "#FFF000",
  },
  indicator: {
    backgroundColor: "#FFF",
  },
});
