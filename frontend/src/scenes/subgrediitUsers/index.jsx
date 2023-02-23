import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  // Button,
  // Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import { useNavigate, useParams } from "react-router-dom";
// import FlexBetween from "components/FlexBetween";

const SubgrediitUsers = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [subgrediit, setSubgrediit] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
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
  useEffect(() => {
    getUser();
    getAllUsers();
    getSubgrediit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!subgrediit) return null;
  if (!allUsers) return null;
  if (!user) return null;

  if (!user.mySubgrediits.includes(subgrediitId)) navigate("/");

  // console.log("Subgrediit followers : ", subgrediit.followers);

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
              // minHeight: "80vh",
              marginTop: "8rem",
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
                }}
              >
                Users
              </Typography>
              <Divider />
              <Box
                sx={{
                  mt: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                      m: 0.5,
                    },
                  }}
                  alignContent="center"
                  alignItems="center"
                  justifyContent="center"
                >
                  {subgrediit.followers.map((userIds) => (
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
                      // p="1rem"
                      mt="1rem"
                      alignContent="space-between"
                      alignItems="space-between"
                      justifyContent="space-between"
                    >
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
                        {/* {userIds} */}
                        {allUsers.map((users) => {
                          if (users._id === userIds) {
                            return users.userName;
                          }
                          return null;
                        })}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Typography
                  variant="h3"
                  textAlign="center"
                  fontWeight="500"
                  color="error"
                  sx={{
                    textTransform: "capitalize",
                    mb: "1rem",
                    mt: "2rem",
                  }}
                >
                  Blocked Users
                </Typography>

                <Divider />
                <Box
                  sx={{
                    mt: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 0.5,
                      },
                    }}
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {/* check if the number of blocked followers is greater than 0 */}
                    {subgrediit.blockedFollowers.length === 0 ? (
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
                        No blocked users
                      </Typography>
                    ) : (
                      subgrediit.blockedFollowers.map((userIds) => (
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
                          // p="1rem"
                          mt="1rem"
                          alignContent="space-between"
                          alignItems="space-between"
                          justifyContent="space-between"
                        >
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
                            {/* {userIds} */}
                            {allUsers.map((users) => {
                              if (users._id === userIds) {
                                return users.userName;
                              }
                              return null;
                            })}
                          </Typography>
                        </Box>
                      ))
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SubgrediitUsers;
