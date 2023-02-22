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
    const { subgrediitId } = useParams();
  
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
      getSubgrediit();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!subgrediit) return null;
  
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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };
  
  export default SubgrediitStats;
  