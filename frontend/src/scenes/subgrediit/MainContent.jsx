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

const MainContent = () => {
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
      <Box
        width={isNonMobileScreens ? "80%" : "80%"}
        style={{
          backgroundColor: theme.palette.background.alt,
          padding: "1rem",
          marginTop: "-3rem",
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

        {/* grid having 2 columns : one with count of followers and other with count of posts */}
        <Grid container spacing={2} justifyContent="center">
          <Grid
            item
            container
            xs={6}
            sm={6}
            md={6}
            lg={6}
            justifyContent="right"
          >
            <Box
              width={isNonMobileScreens ? "30%" : "30%"}
              style={{
                backgroundColor: theme.palette.background.alt,
                padding: "1rem",
              }}
              borderRadius="1.5rem"
            >
              <Typography
                variant="h2"
                textAlign="center"
                fontWeight="500"
                color={theme.palette.text.primary}
                sx={{ mb: "0.7rem" }}
              >
                {subgrediit.posts.length}
              </Typography>
              <Typography
                variant="body2"
                textAlign="center"
                fontWeight="500"
                color={theme.palette.text.primary}
                sx={{
                  mb: "1rem",
                  //   pl: "1rem",
                }}
              >
                posts
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} container>
            <Box
              width={isNonMobileScreens ? "30%" : "30%"}
              style={{
                backgroundColor: theme.palette.background.alt,
                padding: "1rem",
              }}
              borderRadius="1.5rem"
            >
              <Typography
                variant="h2"
                textAlign="center"
                fontWeight="500"
                color={theme.palette.text.primary}
                sx={{
                  mb: "0.7rem",
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.primary.light,
                  },
                }}
                onClick={() => navigate(`/mysubgrediit/${subgrediit._id}/users`)}
              >
                {subgrediit.followers.length}
              </Typography>
              <Typography
                variant="body2"
                textAlign="center"
                fontWeight="500"
                color={theme.palette.text.primary}
                sx={{
                  mb: "1rem",
                }}
              >
                followers
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Box>
          <FlexBetween
            alignContent="left"
            alignItems="left"
            justifyContent="left"
          >
            <Typography
              variant="h5"
              textAlign="left"
              fontWeight="500"
              color={theme.palette.primary.main}
              sx={{
                mt: "2rem",
                //   mb: "2rem",
                pl: "1rem",
              }}
              //   noWrap
            >
              Tags :
            </Typography>
            <Typography
              variant="h5"
              textAlign="left"
              fontWeight="500"
              color={theme.palette.text.primary}
              noWrap
            >
              {subgrediit.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{
                    mt: "1.5rem",
                    mr: "1rem",
                    mb: "1rem",
                  }}
                />
              ))}
            </Typography>
          </FlexBetween>

          <FlexBetween
            alignContent="left"
            alignItems="left"
            justifyContent="left"
          >
            <Typography
              variant="h5"
              textAlign="left"
              fontWeight="500"
              color={theme.palette.primary.main}
              sx={{
                mt: "2rem",
                mb: "2rem",
                pl: "1rem",
              }}
              noWrap
            >
              Banned Keywords :
            </Typography>
            <Typography
              variant="h5"
              textAlign="left"
              fontWeight="500"
              color={theme.palette.text.primary}
              noWrap
            >
              {subgrediit.bannedKeywords.map((keyword) => (
                <Chip
                  key={keyword}
                  label={keyword}
                  sx={{
                    mr: "1rem",
                    mb: "1rem",
                  }}
                />
              ))}
            </Typography>
          </FlexBetween>
        </Box>
      </Box>
    </>
  );
};

export default MainContent;
