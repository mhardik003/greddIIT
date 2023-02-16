// import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import Posts from "./scenes/posts";
// import {RegisterPage} from './scenes/registerPage'
import ProfilePage from "./scenes/profilePage";
import NotFound from "./scenes/notFound";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Mysubgrediits from "scenes/mySubgrediits";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                isAuth ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={isAuth ? <Navigate to="/" /> : <LoginPage />}
            />
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
            />
            < Route
              path="/mysubgrediits/:userId"
              element={isAuth ? <Mysubgrediits /> : <Navigate to="/login" />}
            />
            <Route
              path="/subgrediit/:subgrediitId"
              element={isAuth ? <Posts /> : <Navigate to="/login" />}
            />

            <Route
              path="*"
              element={isAuth ? <NotFound /> : <Navigate to="/login" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
