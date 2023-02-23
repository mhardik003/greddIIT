// import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import Posts from "./scenes/Posts";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import ProfilePage from "./scenes/profilePage";
import NotFound from "./scenes/notFound";
import Mysubgrediits from "./scenes/mySubgrediits";
import SavedPosts from "./scenes/savedPosts";
import Subgrediit from "./scenes/subgrediit";

import SubgrediitUsers from "scenes/subgrediitUsers";
import SubgrediitJoinRequests from "scenes/subgrediitJoinRequests";
import SubgrediitReports from "scenes/subgrediitReports";
import SubgrediitStats from "scenes/subgrediitStats";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isMod = isAuth && true;

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
            <Route
              path="/mysubgrediits"
              element={isAuth ? <Mysubgrediits /> : <Navigate to="/login" />}
            />
            <Route
              path="/mysubgrediit/:subgrediitId"
              element={isMod? <Subgrediit /> : <Navigate to="/" />}
            />
            <Route
              path="/mysubgrediit/:subgrediitId/users"
              element={isMod ? <SubgrediitUsers /> : <Navigate to="/" />}
            />
            <Route
              path="/mysubgrediit/:subgrediitId/joinrequests"
              element={isMod ? <SubgrediitJoinRequests /> : <Navigate to="/" />}
            />
            <Route
              path="/mysubgrediit/:subgrediitId/stats"
              element={isMod ? <SubgrediitStats /> : <Navigate to="/" />}
            />
            <Route
              path="/mysubgrediit/:subgrediitId/reports"
              element={isMod ? <SubgrediitReports /> : <Navigate to="/" />}
            />
            ``
            <Route
              path="/subgrediit/:subgrediitId"
              element={isAuth ? <Posts /> : <Navigate to="/login" />}
            />
            <Route
              path="/savedposts"
              element={isAuth ? <SavedPosts /> : <Navigate to="/login" />}
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

  