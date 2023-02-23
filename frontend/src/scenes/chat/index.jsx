import { Box, Typography } from "@mui/material";
import Navbar from "scenes/navbar";

const Chat = () => {
  console.log("404 Page Not Found");
  return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: ["Rubik", "Helvetica", "Arial", "sans-serif"],
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem, 3rem, 4.25rem)"
          variant="h1"
          component="h1"
          sx={{
            mt: -20,
            color: "#00D5FA",
          }}
        >
          Chat Page
        </Typography>
      </Box>
    </>
  );
};

export default Chat;
