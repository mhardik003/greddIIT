import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "scenes/navbar";

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

  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Grid rowSpacing="2" container justifyContent="center" direction="row">
        <Grid
          item
          xs={12}
          sm={3}
          md={4}
          lg={4}
          container
          // spacing={2}
          // alignItems="center"
          justifyContent="left"
          style={{ minHeight: "100vh" }}
        >
          <Box
            width={isNonMobileScreens ? "80%" : "83%"}
            p="1.5rem"
            m="2rem auto"
            ml="1.5rem"
            mr="0"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography
              textAlign="center"
              fontWeight="500"
              variant="h5"
              color="primary"
              sx={{ mb: "1rem" }}
            >
              Chats
            </Typography>
            <Divider />
            <Box>
              <Typography
                textAlign="left"
                fontWeight="450"
                variant="h6"
                color={theme.palette.neutral.dark}
                sx={{ mt: "1rem" }}
              >
                {user.followers.map((follower) => {
                  return (
                    <div>
                      {follower}
                    </div>
                  );
                })}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={9}
          md={8}
          lg={8}
          container
          // spacing={2}
          // alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Box
            width={isNonMobileScreens ? "100%" : "85%"}
            p="1rem"
            mt="2rem"
            mb="2rem"
            ml="0"
            mr="0"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography
              textAlign="center"
              fontWeight="500"
              variant="h5"
              color="primary"
              sx={{ mb: "1rem" }}
            >
              Chat with{" "}
            </Typography>
            <Divider />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
