import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./navBar";
import FlexBetween from "components/FlexBetween";
import { ReportProblem } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";

const Mysubgrediits = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [user, setUser] = useState(null);
  const [subgrediits, setAllSubgrediits] = useState([]);
  const [joinedSubgrediits, setJoinedSubgrediits] = useState([]);
  const [notjoinedSubgrediits, setNotJoinedSubgrediits] = useState([]);
  const [displaySubgrediits, setDisplaySubgrediits] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const token = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    // console.log("user : ", user);
  };

  const getAllSubgrediits = async () => {
    const response = await fetch(
      `http://localhost:3000/subgrediits/getAllSubgrediits/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setAllSubgrediits(data);
    // console.log("All subgrediits : ", data);
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

  const joinSubgrediit = async (subgrediitId) => {
    // console.log("Join subgrediit : ", subgrediitId);
    const response = await fetch(
      `http://localhost:3000/subgrediits/joinSubgrediit/${id}/${subgrediitId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await response.json();
    // console.log("Join subgrediit : ", data);
    getAllSubgrediits();
  };

  const leaveSubgrediit = async (subgrediitId) => {
    // console.log("Leave subgrediit : ", subgrediitId);
    const response = await fetch(
      `http://localhost:3000/subgrediits/leaveSubgrediit/${id}/${subgrediitId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await response.json();
    getAllSubgrediits();
  };

  const deleteSubgrediit = async (subgrediitId) => {
    // console.log("Delete subgrediit : ", subgrediitId);
    const response = await fetch(
      `http://localhost:3000/subgrediits/deleteSubgrediit/${subgrediitId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await response.json();
    getAllSubgrediits();
  };

  const joinedAndNotJoinedSubgrediits = () => {
    let joined = [];
    let notJoined = [];
    if (subgrediits) {
      joined = subgrediits.filter((subgrediit) => {
        return subgrediit.followers.some((user) => user === id);
      });

      notJoined = subgrediits.filter((subgrediit) => {
        return !subgrediit.followers.some((user) => user === id);
      });
    }
    setJoinedSubgrediits(joined);
    setNotJoinedSubgrediits(notJoined);
    setDisplaySubgrediits(joined.concat(notJoined));
  };

  useEffect(() => {
    getUser();
    getAllUsers();
    getAllSubgrediits();
    joinedAndNotJoinedSubgrediits();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  if (!allUsers) return null;
  if (!subgrediits) return null;
  if (
    subgrediits.length > 0 &&
    joinedSubgrediits.length === 0 &&
    notjoinedSubgrediits.length === 0
  ) {
    joinedAndNotJoinedSubgrediits();
    return null;
  }

  // console.log("Joined Subgrediits : ", joinedSubgrediits);
  // console.log("Not Joined Subgrediits : ", notjoinedSubgrediits);

  // console.log("All Users : ", allUsers);

  return (
    <>
      <ToastContainer />
      <Navbar
        getAllSubgrediits={getAllSubgrediits}
        setDisplaySubgrediits={setDisplaySubgrediits}
        subgrediits={subgrediits}
        joinedAndNotJoinedSubgrediits = {joinedAndNotJoinedSubgrediits}
      />
      <Box>
        <Grid
          spacing={1}
          container
          justifyContent="center"
          direction="row"
          sx={{
            mt: "1rem",
          }}
        >
          <Grid
            item
            xs={0}
            sm={0}
            md={1}
            lg={2}
            container
            spacing={2}
            alignItems="center"
            justifyContent="left"
          ></Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={10}
            lg={8}
            container
            spacing={2}
            alignItems="top"
            justifyContent="left"
            // style={{ minHeight: "100vh" }}
          >
            <Box
              width={isNonMobileScreens ? "80%" : "83%"}
              p="2rem 0.5rem 1rem 0.5rem"
              m="2rem auto"
              mb="1rem"
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
                All SubGrediits
              </Typography>
            </Box>
            <Box
              width={isNonMobileScreens ? "80%" : "83%"}
              p="2rem 0.5rem 1rem 0.5rem"
              m="1rem auto"
              borderRadius="1.5rem"
              backgroundColor={theme.palette.background.alt}
            >
              {/* dropdown menu for sorting subgrediits */}
              <Box
                sx={{
                  pl: "5rem",
                  mb: "3rem",
                }}
              >
                <Typography
                  textAlign="left"
                  fontWeight="500"
                  variant="h5"
                  color="primary"
                  sx={{ mb: "1.5rem" }}
                >
                  Sort by
                </Typography>

                {/* dropdown menu*/}
              </Box>
              {/* check if the number of subgrediits is 0 */}
              {subgrediits.length === 0 ? (
                <Typography
                  textAlign="center"
                  fontWeight="500"
                  variant="h5"
                  color="primary"
                  sx={{ mb: "1.5rem" }}
                >
                  You have not created any subgrediits yet
                </Typography>
              ) : (
                displaySubgrediits.map((subgrediit) => (
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
                        sx={{
                          mb: "0.2rem",
                          pl: "1rem",
                          "&:hover": {
                            cursor: "pointer",
                            color: theme.palette.neutral.dark,
                          },
                        }}
                        onClick={() => {
                          // allow only followers to view the subgrediit
                          if (
                            subgrediit.followers.includes(id) ||
                            subgrediit.moderators[0] === id
                          ) {
                            navigate(`/subgrediit/${subgrediit._id}`);
                          }
                        }}
                      >
                        {subgrediit.name}
                      </Typography>

                      {subgrediit.moderators[0] === id ? (
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            mr: "1rem",
                            color: theme.palette.background.default,
                          }}
                          onClick={() => {
                            console.log("Deleting subgrediit");
                            deleteSubgrediit(subgrediit._id);
                          }}
                        >
                          Delete
                        </Button>
                      ) : subgrediit.leftors.includes(id) ? (
                        <>
                          <Typography
                            variant="body2"
                            sx={{
                              pr: "1rem",
                              pt: "- 0.5rem",
                            }}
                            onClick={() => {
                              toast.error(
                                "Cannot join a Subgrediit once you have left it",
                                {
                                  position: "top-right",
                                  autoClose: 2000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "colored",
                                }
                              );
                            }}
                          >
                            <IconButton>
                              <ReportProblem />
                            </IconButton>
                          </Typography>
                        </>
                      ) : subgrediit.followers.includes(id) ? (
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Clicked on leave");
                            leaveSubgrediit(subgrediit._id);
                          }}
                        >
                          Leave
                        </Button>
                      ) : subgrediit.joinRequests.includes(id) ? (
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            mr: "1rem",
                            color: theme.palette.background.default,
                          }}
                          onClick={() => {
                            console.log("Clicked on remove join request");
                            joinSubgrediit(subgrediit._id);
                          }}
                        >
                          Remove Request
                        </Button>
                      ) : subgrediit.blockedFollowers.includes(id) ? (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Blocked User");
                            // joinSubgrediit(subgrediit._id);
                          }}
                          disabled
                        >
                          Blocked
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Clicked on join");
                            joinSubgrediit(subgrediit._id);
                          }}
                        >
                          Join
                        </Button>
                      )}
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
                    <Typography
                      textAlign="left"
                      fontWeight="500"
                      variant="body2"
                      color="#666666"
                      sx={{ mt: "0.2rem", mb: "0.5rem", pl: "1rem" }}
                    >
                      Created By : @{""}
                      {allUsers
                        .filter((user) => user._id === subgrediit.moderators[0])
                        .map((user) => user.userName)}
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
                      BANNED KEYWORDS : {subgrediit.bannedKeywords.join(", ")}
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
                  </Box>
                ))
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={0}
            sm={0}
            md={1}
            lg={2}
            container
            spacing={2}
            alignItems="center"
            justifyContent="left"
          ></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Mysubgrediits;
