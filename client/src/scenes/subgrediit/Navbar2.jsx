import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Grid,
  Divider,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Search, DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import ApprovalIcon from "@mui/icons-material/Approval";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate, useParams } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar2 = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // console.log("user from navbar : ", user);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const { subgrediitId } = useParams();

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <Grid container alignContent="center" justifyContent="center">
        <FlexBetween
          padding="1rem 6%"
          backgroundColor={alt}
          border="1px solid #e6e6e6"
          borderRadius="0 0 10px 10px"
          borderTop="2px solid #1A1A1A"
          zIndex="100"
          mt="-0.1rem"
          gap="2rem"
        >
          <PeopleIcon
            sx={{
              fontSize: "25px",
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/mysubgrediit/${subgrediitId}/users`)}
          />
          <ApprovalIcon
            sx={{
              fontSize: "25px",
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/mysubgrediit/${subgrediitId}/joinrequests`)}
          />

          <ReportIcon
            sx={{
              fontSize: "25px",
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/mysubgrediit/${subgrediitId}/reports`)}
          />
          <QueryStatsIcon
            sx={{
              fontSize: "25px",
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/mysubgrediit/${subgrediitId}/stats`)}
          />
        </FlexBetween>
      </Grid>
    </>
  );
};

export default Navbar2;
