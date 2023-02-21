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
import { useSelector } from "react-redux";
import Navbar from "./navBar";
// import CreateSubgrediit from "./CreateSubgrediit";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Mysubgrediits = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [user, setUser] = useState(null);
  const [mysubgrediits, setMySubgrediits] = useState([]);
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

  const getMySubgrediits = async () => {
    const response = await fetch(
      `http://localhost:3000/subgrediits/getMySubgrediits/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setMySubgrediits(data);
    // console.log("data : ", data);
  };

    const deleteSubgrediit = async (subgrediitId) => {
        console.log("subgrediitId : ", subgrediitId);
    const response = await fetch(
        `http://localhost:3000/subgrediits/deleteSubgrediit/${subgrediitId}`,
        {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    await response.json();
    // const data = await response.json();
    // console.log("data : ", data);
    getMySubgrediits();
    };

  useEffect(() => {
    getUser();
    getMySubgrediits();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
//   console.log("user : ", user);
//   console.log("mysubgrediits : ", mysubgrediits);

  return (
    <>
      <Navbar getMySubgrediits={getMySubgrediits}/>
      <Box>
        <Grid spacing={1} container justifyContent="center" direction="row">
          <Grid
            item
            xs={0}
            md={3}
            lg={2}
            container
            spacing={2}
            alignItems="center"
            justifyContent="left"
            style={{ minHeight: "100vh" }}
          ></Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={8}
            container
            spacing={2}
            alignItems="top"
            justifyContent="left"
            style={{ minHeight: "100vh" }}
          >
            <Box
              width={isNonMobileScreens ? "80%" : "83%"}
              p="2rem 0.5rem 1rem 0.5rem"
              m="2rem auto"
              borderRadius="1.5rem"
              backgroundColor={theme.palette.background.alt}
            >
              <Typography
                textAlign="center"
                fontWeight="500"
                variant="h2"
                color="primary"
                sx={{ mb: "1.5rem" }}
              >
                My SubGrediits
              </Typography>
              {/* SHOW MY SUBGREDIITS */}
              {mysubgrediits.map((subgrediit) => (
                <Box
                  key={subgrediit._id}
                  width={isNonMobileScreens ? "80%" : "83%"}
                  p="1rem"
                  m="2rem auto"
                  borderRadius="1.5rem"
                  backgroundColor={theme.palette.background.default}
                >
                  <FlexBetween justifyContent="space-between">
                    <Typography
                      textAlign="left"
                      fontWeight="500"
                      variant="h5"
                      color="primary"
                      sx={{ mb: "0.2rem", pl: "1rem" ,
                      "&:hover": {
                        cursor: "pointer",
                        color: theme.palette.neutral.dark,
                      }
                    }}
                      onClick={() => {
                        console.log("clicked on subgrediit");
                        navigate(`/subgrediit/${subgrediit._id}`)
                      }}
                    >
                      {subgrediit.name}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => {
                        console.log("delete the subgrediit", subgrediit.name);
                        deleteSubgrediit(subgrediit._id);
                      }}
                      color="error"
                    >
                      <DeleteForeverIcon
                        style={{
                          color: theme.palette.neutral.dark,
                          // marginLeft: "1rem",
                          cursor: "pointer",
                        }}
                      />
                    </Button>
                  </FlexBetween>
                  <Typography
                    textAlign="left"
                    fontWeight="500"
                    variant="body2"
                    color="#666666"
                    sx={{ mt: "0.2rem", mb: "0.5rem", pl: "1rem" }}
                  >
                    Created On : {subgrediit.creationDate.substring(0, 10)}
                  </Typography>
                  <Divider />
                  <Typography
                    textAlign="left"
                    fontWeight="500"
                    variant="body1"
                    color={theme.palette.neutral.dark}
                    sx={{ mt: "1rem", mb: "0.2rem", pl: "1rem" }}
                  >
                    DESCRIPTION : {subgrediit.description}
                  </Typography>

                  <Typography
                    textAlign="left"
                    fontWeight="500"
                    variant="body1"
                    color={theme.palette.neutral.dark}
                    display="inline"
                    sx={{ mb: "0", pl: "1rem" }}
                  >
                    TAGS : {subgrediit.tags.join(", ")}
                  </Typography>

                  <Typography
                    textAlign="left"
                    fontWeight="500"
                    variant="body1"
                    color={theme.palette.neutral.dark}
                    sx={{ mt: "0.2rem", pl: "1rem" }}
                  >
                    Banned Keywords : {subgrediit.bannedKeywords.join(", ")}
                  </Typography>

                  <Typography
                    textAlign="left"
                    fontWeight="500"
                    variant="body1"
                    color={theme.palette.neutral.dark}
                    sx={{ mt: "0.2rem", pl: "1rem" }}
                  >
                    Posts : {subgrediit.posts.length}
                  </Typography>

                  <Typography
                    textAlign="left"
                    fontWeight="500"
                    variant="body1"
                    color={theme.palette.neutral.dark}
                    sx={{ mt: "0.2rem", pl: "1rem" }}
                  >
                    Followers : {subgrediit.followers.length}
                  </Typography>

                  <Typography
                    textAlign="left"
                    fontWeight="500"
                    variant="body1"
                    color={theme.palette.neutral.dark}
                    sx={{ mt: "0.2rem", pl: "1rem" }}
                  >
                    Join Requests : {subgrediit.joinRequests.length}
                  </Typography>

                  <Typography
                    textAlign="left"
                    fontWeight="500"
                    variant="body1"
                    color={theme.palette.neutral.dark}
                    sx={{ mt: "0.2rem", pl: "1rem" }}
                  >
                    Reported Posts : {subgrediit.reportedPosts.length}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid
            item
            xs={0}
            md={3}
            lg={2}
            container
            spacing={2}
            alignItems="center"
            justifyContent="left"
            style={{ minHeight: "100vh" }}
          ></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Mysubgrediits;
