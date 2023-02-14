import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  Avatar,
  Backdrop,
} from "@mui/material";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FlexBetween from "components/FlexBetween";
import Fade from "@mui/material/Fade";

// modal showing the followers of the user

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1A1A1A",
  color: "#F6F6F6",
  borderRadius: "10px",
  border: "2px solid #000",
  //   boxShadow: 24,
  pt: 4,
  pb: 4,
};

const UserDetails = ({ userId, userData }) => {
  const token = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.user);

  const [allUsers, setAllUsers] = React.useState([]);
  const [followersOpen, setFollowersOpen] = React.useState(false);
  const [followingOpen, setFollowingOpen] = React.useState(false);
  const [followersArray, setFollowersArray] = React.useState([]);
  const [NotFollowersArray, setNotFollowersArray] = React.useState([]);
  const [followingArray, setFollowingArray] = React.useState([]);
  const [NotFollowingArray, setNotFollowingArray] = React.useState([]);
  const handleFollowersOpen = () => setFollowersOpen(true);
  const handleFollowersClose = () => setFollowersOpen(false);

  const handleFollowingOpen = () => setFollowingOpen(true);
  const handleFollowingClose = () => setFollowingOpen(false);

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const navigate = useNavigate();
  // const dark = theme.palette.neutral.dark;
  // const medium = theme.palette.neutral.medium;
  // const main = theme.palette.neutral.main;
  // const [user, setUser] = useState(null);
  // const token = useSelector((state) => state.token);
  // const { id } = useSelector((state) => state.user);
  // const primaryLight = theme.palette.primary.light;
  //   console.log("userDetails : ", userData);

  const { firstName, lastName, userName, email, contactNumber, age, posts } =
    userData;

  const getAllUsers = async () => {
    const response = await fetch("http://localhost:3000/users/getAllUsers", {
      method: "GET",
    });
    const data = await response.json();
    setAllUsers(data);
  };

  const getFollowers = async (followers) => {
    const response = await fetch(
      `http://localhost:3000/users/${id}/followers`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();
    // console.log("data from getFollowers response: ", data);
    setFollowersArray(data);
  };

  const getNonFollowers = (allUsers, followersArray) => {
    // allUSers- followersArray = nonFollowersArray using filter

    let temp_notFollowers = allUsers.filter((user) => {
      return !followersArray.some((follower) => {
        return follower._id === user._id || user._id === userId;
      });
    });

    //check and remove if the user itself is in the array
    temp_notFollowers = temp_notFollowers.filter((user) => {
      return user._id !== userId;
    });

    setNotFollowersArray(temp_notFollowers);
  };

  const getFollowing = async (following) => {
    const response = await fetch(
      `http://localhost:3000/users/${id}/following`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();
    // console.log("data from getFollowing response: ", data);
    setFollowingArray(data);
  };

  const getNonFollowing = (allUsers, followingArray) => {
    let temp_notFollowing = allUsers.filter((user) => {
      return !followingArray.some((following) => {
        return following._id === user._id || user._id === userId;
      });
    });
    //check and remove if the user itself is in the array
    temp_notFollowing = temp_notFollowing.filter((user) => {
      return user._id !== userId;
    });

    setNotFollowingArray(temp_notFollowing);
  };

  const removeFollower = async (id) => {
    // console.log("id : ", id);
    const response = await fetch(
      `http://localhost:3000/users/AddRemoveFollower/${userId}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await response.json();
    // const data = await response.json();
    // console.log("data : ", data);
    getFollowers();
  };

  const removeFollowing = async (id) => {
    // console.log("id : ", id);
    const response = await fetch(
      `http://localhost:3000/users/AddRemoveFollowing/${userId}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await response.json();
    // const data = await response.json();
    // console.log("data : ", data);
    getFollowing();
  };

  React.useEffect(() => {
    getAllUsers();
    getFollowers();
    getFollowing();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    getNonFollowers(allUsers, followersArray);
  }, [allUsers, followersArray]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    getNonFollowing(allUsers, followingArray);
  }, [allUsers, followingArray]); //  eslint-disable-line react-hooks/exhaustive-deps

  //   console.log("allUsers : ", allUsers);
  //   console.log("followingArray : ", followingArray);
  //   console.log("followersArray : ", followersArray);
  //   console.log("NotFollowersArray : ", NotFollowersArray);
  //   console.log("NotFollowingArray : ", NotFollowingArray);

  return (
    <>
      <Modal
        open={followersOpen}
        onClose={handleFollowersClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={followersOpen}>
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h3"
              align="center"
              component="h1"
              sx={{
                color: "#F6F6F6",
                mb: 1,
              }}
            >
              Followers
            </Typography>
            <Divider />
            <Box
              direction="row"
              justifyContent="space-between"
              backgroundColor="#111111"
              alignItems="center"
              // borderRadius="1rem"
              sx={{
                mt: 1,
                mb: 1,
                pt: 1,
                pb: 1,
                pl: 5,
                pr: 5,
              }}
            >
              {followersArray.map((follower) => (
                <FlexBetween
                  sx={{
                    flexWrap: "wrap",
                    mt: 1,
                    mb: 1,
                  }}
                  key={follower._id}
                >
                  <Typography variant="body1" sx={{ color: "#F6F6F6" }}>
                    {follower.firstName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      removeFollower(follower._id);
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#F6F6F6" }}>
                      Remove
                    </Typography>
                  </Button>
                </FlexBetween>
              ))}

              {NotFollowersArray.map((notFollower) => (
                <FlexBetween
                  sx={{
                    flexWrap: "wrap",
                    mt: 1,
                    mb: 1,
                  }}
                  key={notFollower._id}
                >
                  <Typography variant="body1" sx={{ color: "#F6F6F6" }}>
                    {notFollower.firstName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      removeFollower(notFollower._id);
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#F6F6F6" }}>
                      Add
                    </Typography>
                  </Button>
                </FlexBetween>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={followingOpen}
        onClose={handleFollowingClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={followingOpen}>
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h3"
              align="center"
              component="h1"
              sx={{
                color: "#F6F6F6",
                mb: 1,
              }}
            >
              Following
            </Typography>
            <Divider />
            <Box
              direction="row"
              justifyContent="space-between"
              backgroundColor="#111111"
              alignItems="center"
              // borderRadius="1rem"
              sx={{
                mt: 1,
                mb: 1,
                pt: 1,
                pb: 1,
                pl: 5,
                pr: 5,
              }}
            >
              {followingArray.map((following) => (
                <FlexBetween
                  sx={{
                    flexWrap: "wrap",
                    mt: 1,
                    mb: 1,
                  }}
                  key={following._id}
                >
                  <Typography variant="body1" sx={{ color: "#F6F6F6" }}>
                    {following.firstName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      removeFollowing(following._id);
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#F6F6F6" }}>
                      Remove
                    </Typography>
                  </Button>
                </FlexBetween>
              ))}

              {NotFollowingArray.map((notFollowing) => (
                <FlexBetween
                  sx={{
                    flexWrap: "wrap",
                    mt: 1,
                    mb: 1,
                  }}
                  key={notFollowing._id}
                >
                  <Typography variant="body1" sx={{ color: "#F6F6F6" }}>
                    {notFollowing.firstName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      removeFollowing(notFollowing._id);
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#F6F6F6" }}>
                      Add
                    </Typography>
                  </Button>
                </FlexBetween>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Grid
        item
        xs={12}
        md={6}
        lg={5}
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Box
          width={isNonMobileScreens ? "80%" : "83%"}
          height={isNonMobileScreens ? "85%" : "83%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography
            textAlign="center"
            fontWeight="500"
            variant="h2"
            sx={{ mb: "1.5rem" }}
            color="primary"
          >
            Profile
          </Typography>

          {/* Profile Description */}
          <Avatar
            name={firstName + " " + lastName}
            alt={firstName + " " + lastName}
            color={theme.palette.primary.main}
            sx={{ width: 150, height: 150, m: "auto" }}
            // source from local assets
            src={"../../assets/images/user.png"}
          />
          <Grid
            // container
            // spacing={5}
            // alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Box
              width={isNonMobileScreens ? "100%" : "100%"}
              height={isNonMobileScreens ? "40%" : "83%"}
              p="2rem"
              m="2rem auto"
              borderRadius="1.5rem"
              backgroundColor={theme.palette.background.alt}
            >
              <FlexBetween>
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                  Name
                </Typography>
                <Typography>
                  {firstName} {lastName}
                </Typography>
              </FlexBetween>
              <Divider />

              <FlexBetween>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Username
                </Typography>

                <Typography>{userName}</Typography>
              </FlexBetween>
              <Divider />

              <FlexBetween>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Email
                </Typography>

                <Typography>{email}</Typography>
              </FlexBetween>

              <Divider />

              <FlexBetween>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Contact Number
                </Typography>

                <Typography>{contactNumber}</Typography>
              </FlexBetween>

              <Divider />

              <FlexBetween>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Age
                </Typography>

                <Typography>{age}</Typography>
              </FlexBetween>

              <Divider />

              <FlexBetween onClick={handleFollowersOpen}>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Followers
                </Typography>

                <Typography> {followersArray.length}</Typography>
              </FlexBetween>

              <Divider />

              <FlexBetween onClick={handleFollowingOpen}>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Following
                </Typography>

                <Typography>{followingArray.length}</Typography>
              </FlexBetween>
              <Divider />

              <FlexBetween>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Posts
                </Typography>

                <Typography>{posts.length}</Typography>
              </FlexBetween>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default UserDetails;
