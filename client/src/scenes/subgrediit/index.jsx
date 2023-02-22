import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import Navbar2 from "./Navbar2";
import { useNavigate, useParams } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import MainContent from "./MainContent";

const Index = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [user, setUser] = useState(null);
  const [subgrediit, setSubgrediit] = useState(null);
  const token = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.user);
  const { subgrediitId } = useParams();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const getSubgrediit = async () => {
    const response = await fetch(
      `http://localhost:3000/subgrediits/find/${subgrediitId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setSubgrediit(data);
    // console.log("subgrediit : ", subgrediit);
  };

  useEffect(() => {
    getUser();
    getSubgrediit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  if (!subgrediit) return null;

  //   console.log("subgrediit : ", subgrediit);

  return (
    <>
      <Navbar />
      <Navbar2/>

      <Box>
        <Grid spacing={2} container justifyContent="center" direction="row">
          <Grid
            item
            container
            
            xs={12}
            sm={12}
            md={7}
            lg={6}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            style={{
              minHeight: "100vh",
            }}
          >
            <MainContent/>
            
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Index;
