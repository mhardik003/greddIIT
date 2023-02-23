import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import { useNavigate, useParams } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const SubgrediitReports = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [subgrediit, setSubgrediit] = useState(null);
  const [allSubgrediits, setAllSubgrediits] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const token = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.user);
  const { subgrediitId } = useParams();

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
    // console.log("data : ", data);
  };

  const findReports = async () => {
    const response = await fetch(
      `http://localhost:3000/reports/getSubgrediitReports/${subgrediitId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setReports(data);
    console.log("reports : ", reports);
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

  const blockUser = async (userId, subgrediitId) => {
    console.log(
      " Block the user : ",
      userId,
      " from subgrediit : ",
      subgrediitId
    );
    const response = await fetch(
      `http://localhost:3000/subgrediits/blockUser/${userId}/${subgrediitId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log("data : ", data);
    getSubgrediit();
    findReports();
  };

  const ignoreReport = async (reportId) => {
    console.log(" Ignore the report : ", reportId);
    const response = await fetch(
      `http://localhost:3000/reports/ignoreReport/${reportId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log("data : ", data);
    findReports();
  };

  const deletePost = async (postId) => {
    console.log(" Delete the post : ", postId);
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/delete`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log("data : ", data);
    findReports();
  };

  const deleteReport = async (reportId) => {
    console.log(" Delete the report : ", reportId);
    const response = await fetch(
      `http://localhost:3000/reports/deleteReport/${reportId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // console.log("data : ", data);
    findReports();
  };

  useEffect(() => {
    getSubgrediit();
    findReports();
    getAllUsers();
    getAllSubgrediits();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!subgrediit) return null;
  if (!reports) return null;
  if (!allUsers) return null;
  if (!allSubgrediits) return null;

  console.log("subgrediit : ", subgrediit);

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
              minHeight: "80vh",
              marginTop: "5rem",
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
            <Grid
              container
              width={isNonMobileScreens ? "80%" : "80%"}
              style={{
                backgroundColor: theme.palette.background.alt,
                padding: "1rem",
                marginTop: "3rem",
              }}
              borderRadius="1.5rem"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                direction="row"
              >
                <Typography
                  variant="h3"
                  textAlign="center"
                  fontWeight="500"
                  color="primary"
                  sx={{
                    mb: "1rem",
                  }}
                >
                  Reports
                </Typography>
              </Grid>

              <Divider />

              <Grid
                container
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                direction="column"
              >
                {reports.length === 0 ? (
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
                    No reports yet
                  </Typography>
                ) : (
                  reports.map((report) => (
                    <Box
                      key={report._id}
                      sx={{
                        width: "100%",
                        backgroundColor: theme.palette.background.default,
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                      }}
                      borderRadius="1rem"
                      p="1rem"
                      mt="1rem"
                      alignContent="space-between"
                      alignItems="space-between"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Box display="flex">
                          <Typography
                            variant="h5"
                            textAlign="center"
                            fontWeight="500"
                            color={theme.palette.primary.main}
                            sx={{
                              // mb: "1rem",
                              pl: "1rem",
                              mt: "1rem",
                            }}
                            noWrap
                          >
                            "{report.concern}"
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          textAlign="left"
                          fontWeight="500"
                          color={theme.palette.text.light}
                          sx={{
                            pl: "1rem",
                            mt: "0.5rem",
                          }}
                          noWrap
                        >
                          Reported by : @
                          {allUsers
                            .filter((user) => user._id === report.reportedBy)
                            .map((user) => user.userName)}
                        </Typography>
                        <Typography
                          variant="body2"
                          textAlign="left"
                          fontWeight="500"
                          color={theme.palette.text.light}
                          sx={{
                            pl: "1rem",
                          }}
                          noWrap
                        >
                          Reported User : @
                          {allUsers
                            .filter((user) => user._id === report.reportedUser)
                            .map((user) => user.userName)}
                        </Typography>
                        <Typography
                          variant="body2"
                          textAlign="left"
                          fontWeight="500"
                          color={theme.palette.text.light}
                          sx={{
                            pl: "1rem",
                          }}
                          noWrap
                        >
                          Reported Subgrediit : {""}
                          {allSubgrediits
                            .filter(
                              (subgrediit) =>
                                subgrediit._id === report.reportedSubgrediit
                            )
                            .map((subgrediit) => subgrediit.name)}
                        </Typography>
                      </Box>
                      {/* Three buttons : Delete, Block, Ignore */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          sx={{
                            width: "100%",
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.background.default,
                          }}
                          onClick={() => {
                            deletePost(report.reportedPost);
                            // deleteReport(report._id);
                            console.log("Delete post");
                          }}
                          disabled={report.ignored}
                        >
                          Delete Post
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="warning"
                          sx={{
                            width: "100%",

                            color: theme.palette.background.default,
                          }}
                          // check if the user is already blocked, if yes then disbale the button

                          disabled={
                            subgrediit.blockedFollowers.includes(
                              report.reportedUser
                            ) || report.ignored
                          }
                          onClick={() => {
                            blockUser(
                              report.reportedUser,
                              report.reportedSubgrediit
                            );
                            console.log("Block user");
                          }}
                        >
                          Block
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{
                            width: "100%",

                            color: theme.palette.background.default,
                          }}
                          onClick={() => {
                            ignoreReport(report._id);
                            console.log("Ignore report");
                          }}
                          disabled={report.ignored}
                        >
                          Ignore
                        </Button>
                      </Box>
                    </Box>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      </Box>
    </>
  );
};

export default SubgrediitReports;
