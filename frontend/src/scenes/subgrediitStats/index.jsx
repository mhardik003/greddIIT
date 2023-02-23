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
import { useNavigate, useParams } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const SubgrediitStats = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [subgrediit, setSubgrediit] = useState(null);
  const token = useSelector((state) => state.token);
  const [currdate, setCurrDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [creationDate, setCreationDate] = useState(new Date());
  const { subgrediitId } = useParams();
  const { id } = useSelector((state) => state.user);

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

  const setCurrentDate = () => {
    setCurrDate(new Date());
    if (subgrediit)
      setCreationDate(new Date(subgrediit.creationDate.slice(0, 10) + " GMT"));
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    // console.log("user : ", user);
  };

  useEffect(() => {
    getSubgrediit();
    getUser();
    const interval = setInterval(() => {
      setCurrentDate();
    }, 40000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!subgrediit) return null;
  if (!user) return null;

  if (!user.mySubgrediits.includes(subgrediitId)) navigate("/");

  console.log("Subgrediit : ", subgrediit.creationDate.slice(0, 15));
  console.log("Creation Date : ", creationDate);
  console.log("Date : ", currdate);
  // console.log("Difference : ", Math.ceil(Math.abs(subgrediit.creationDate - date)/1000*60*60*24));

  return (
    <>
      <Navbar />

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
              minHeight: "80vh",
            }}
          >
            <Box
              width={isNonMobileScreens ? "80%" : "80%"}
              style={{
                backgroundColor: theme.palette.background.alt,
                padding: "1rem",
                marginTop: "-5rem",
              }}
              borderRadius="1.5rem"
            >
              <Typography
                variant="h3"
                textAlign="center"
                fontWeight="500"
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  mb: "1rem",
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.primary.light,
                  },
                }}
                onClick={() => navigate(`/subgrediit/${subgrediit._id}`)}
              >
                {subgrediit.name}
              </Typography>

              <Typography
                variant="h5"
                textAlign="center"
                fontWeight="500"
                color={theme.palette.text.primary}
                sx={{
                  mb: "1rem",
                  //   pl: "1rem",
                }}
              >
                {subgrediit.description}
              </Typography>
            </Box>
            <Box
              width={isNonMobileScreens ? "80%" : "80%"}
              style={{
                backgroundColor: theme.palette.background.alt,
                padding: "1rem",
                marginTop: "3rem",
              }}
              borderRadius="1.5rem"
            >
              <Typography
                variant="h3"
                textAlign="center"
                fontWeight="500"
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  mb: "1rem",
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.primary.light,
                  },
                }}
                onClick={() => navigate(`/subgrediit/${subgrediit._id}`)}
              >
                Stats
              </Typography>
              <Box>
                <Typography
                  variant="h5"
                  textAlign="center"
                  fontWeight="500"
                  color={theme.palette.text.primary}
                  sx={{
                    mb: "1rem",
                    //   pl: "1rem",
                  }}
                >
                  Subscribers : {subgrediit.followers.length}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SubgrediitStats;
