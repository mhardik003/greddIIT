import React from "react";
import Navbar from "scenes/navbar";
import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";

const Posts = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [user, setUser] = useState(null);
    const [subgrediits, setAllSubgrediits] = useState([]);
    const token = useSelector((state) => state.token);
    const { id } = useSelector((state) => state.user);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    
  return (
    <div>
      <Navbar />
      <h1>Posts</h1>
    </div>
  );
};

export default Posts;
