// import './App.css';
import React, { useState } from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import HomePage from './scenes/homePage'
import LoginPage from './scenes/loginPage'
// import {RegisterPage} from './scenes/registerPage'
import ProfilePage from './scenes/profilePage'
// import {NotFoundPage} from './scenes/notFoundPage'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';



function App() {
  const mode=useSelector((state)=>state.mode)
  const theme = useMemo(() =>createTheme(themeSettings(mode)),[mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/profile/:userId" element={<ProfilePage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
