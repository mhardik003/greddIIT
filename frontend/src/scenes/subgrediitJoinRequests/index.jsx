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

const SubgrediitJoinRequests = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [subgrediit, setSubgrediit] = useState(null);
  const token = useSelector((state) => state.token);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
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

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    // console.log("user : ", user);
  };


  const getAllUsers = async () => {
    const response = await fetch(`http://localhost:3000/users/getAllUsers`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAllUsers(data);
    // console.log("All users : ", data);
  };

  const acceptJoinRequest = async (userId) => {
    const response = await fetch(
      `http://localhost:3000/subgrediits/acceptJoinRequest/${userId}/${subgrediitId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log("data : ", data);
    getSubgrediit();
  };

  const rejectJoinRequest = async (userId) => {
    const response = await fetch(
      `http://localhost:3000/subgrediits/rejectJoinRequest/${userId}/${subgrediitId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log("data : ", data);
    getSubgrediit();
  };

  useEffect(() => {
    getSubgrediit();
    getAllUsers();
    getUser();



  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!subgrediit) return null;
  if (!allUsers) return null;
  if (!user) return null;

  if(!user.mySubgrediits.includes(subgrediitId)) navigate("/");

  // console.log("subgrediit : ", subgrediit);
  // console.log("allUsers : ", allUsers);

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
              marginTop: "5rem",
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
            <Grid
              container
              width={isNonMobileScreens ? "80%" : "80%"}
              style={{
                backgroundColor: theme.palette.background.alt,
                padding: "1rem",
                marginTop: "3rem",
              }}
              borderRadius="1.5rem"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                direction="row"
              >
                <Typography
                  variant="h3"
                  textAlign="center"
                  fontWeight="500"
                  color="primary"
                  sx={{
                    mb: "1rem",
                  }}
                >
                  Join Requests
                </Typography>
              </Grid>

              <Divider />

              <Grid
                container
                sx={{
                  mt: "1rem",
                }}
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                direction="column"
              >
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  alignContent="center"
                  direction="column"
                >
                  {subgrediit.joinRequests.length === 0 ? (
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
                      No Join Requests
                    </Typography>
                  ) : (
                    subgrediit.joinRequests.map((userIds) => (
                      <Box
                        key={userIds}
                        sx={{
                          width: "80%",
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                          backgroundColor: theme.palette.background.default,
                        }}
                        borderRadius="1rem"
                        p="1rem"
                        mt="1rem"
                        alignContent="space-between"
                        alignItems="space-between"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography
                            variant="h5"
                            textAlign="center"
                            fontWeight="500"
                            color={theme.palette.text.primary}
                            sx={{
                              mb: "1rem",
                              pl: "1rem",
                              mt: "1rem",
                            }}
                            noWrap
                          >
                            {allUsers.map((user) => {
                              if (user._id === userIds) {
                                return user.userName;
                              }
                            })}
                          </Typography>
                        </Box>
                        <FlexBetween>
                          <Button
                            variant="contained"
                            color="success"
                            sx={{
                              mr: "1rem",
                            }}
                            onClick={() => {
                              console.log("Accept clicked");
                              acceptJoinRequest(userIds);
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              console.log("Reject clicked");
                              rejectJoinRequest(userIds);
                            }}
                          >
                            Reject
                          </Button>
                        </FlexBetween>
                      </Box>
                    ))
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SubgrediitJoinRequests;
