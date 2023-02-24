import { Box, useMediaQuery, Typography, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import Form from "./Form";
import UserDetails from "./userDetails";

const ProfilePage = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const dark = theme.palette.neutral.dark;
  // const medium = theme.palette.neutral.medium;
  // const main = theme.palette.neutral.main;
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.user);
  // const primaryLight = theme.palette.primary.light;

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

  // console.log("user : ", user);
  // const {
  //   firstName,
  //   lastName,
  //   userName,
  //   email,
  //   contactNumber,
  //   age,
  //   following,
  //   followers,
  //   posts,
  // } = user;

  // console.log("user : ", user);
  // const { id, picturePath } = useSelector((state) => state.user);
  // console.log("userId_index : ", id);
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Grid spacing={2} container justifyContent="center" direction="row">
        <UserDetails userId={id} userData={user} />

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
              color="primary"
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
