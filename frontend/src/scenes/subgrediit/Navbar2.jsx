import { useTheme, Grid } from "@mui/material";
import ApprovalIcon from "@mui/icons-material/Approval";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate, useParams } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar2 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const { subgrediitId } = useParams();

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
            onClick={() =>
              navigate(`/mysubgrediit/${subgrediitId}/joinrequests`)
            }
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
