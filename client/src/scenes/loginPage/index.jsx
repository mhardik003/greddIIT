import { Box, Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const primaryLight = theme.palette.primary.dark;

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          onClick={() => navigate("/login")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          GredIIT
        </Typography>
      </Box>
      <Grid container spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
      <Box
        width={isNonMobileScreens ? "40%" : "83%"}
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
          Welcome to GredIIT, the better Reddit
        </Typography>
        
        
          <Form />
        
      </Box>
      </Grid>
    </Box>
  );
};

export default LoginPage;
