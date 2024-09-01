import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { jobFinderTheme } from "./theme";
import { Toaster } from "react-hot-toast";

const appTheme = jobFinderTheme();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Toaster
          toastOptions={{
            style: {
              fontWeight: 500,
              fontFamily: "'Montserrat', sans-serif",
            },
          }}
        />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);