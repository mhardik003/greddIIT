import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FlexBetween from "components/FlexBetween";
import Form from "./Form";

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dark = theme.palette.neutral.dark;
  const medium = theme.palette.neutral.medium;
  const main = theme.palette.neutral.main;
  const [user, setUser] = useState(null);
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
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const {
    firstName,
    lastName,
    userName,
    email,
    contactNumber,
    age,
    following,
    followers,
    posts,
  } = user;
  // console.log("user : ", user);
  // const { id, picturePath } = useSelector((state) => state.user);
  // console.log("userId_index : ", id);
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Grid spacing={2} container justifyContent="center" direction="row">
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
            >
              Profile
            </Typography>

            {/* Profile Description */}
            <Avatar
              name= {firstName + " " + lastName}
              alt={firstName + " " + lastName}
              color={theme.palette.primary.main}
              sx={{ width: 200, height: 200, m: "auto" }}
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

              <FlexBetween>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Followers
                </Typography>

                <Typography> {followers.length}</Typography>
              </FlexBetween>

              <Divider />

              <FlexBetween>
                <Typography
                  fontWeight="500"
                  variant="h5"
                  sx={{ mb: "1.5rem", mt: "1.5rem" }}
                >
                  Following
                </Typography>

                <Typography>{following.length}</Typography>
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

        <Grid
          item
          xs={12}
          md={6}
          lg={7}
          container
          spacing={2}
          alignItems="center"
          justifyContent="left"
          style={{ minHeight: "100vh" }}
        >
          <Box
            width={isNonMobileScreens ? "80%" : "83%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography
              textAlign="center"
              fontWeight="500"
              variant="h5"
              sx={{ mb: "1.5rem" }}
            >
              Edit Profile
            </Typography>

            <Form userId={id} userData={user} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
