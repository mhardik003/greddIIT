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
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import { useNavigate, useParams } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import emailjs from "emailjs-com";

const SubgrediitReports = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [subgrediit, setSubgrediit] = useState(null);
  const [allSubgrediits, setAllSubgrediits] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [reports, setReports] = useState([]);
  const token = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.user);
  const { subgrediitId } = useParams();
  const [user, setUser] = useState(null);

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

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    // console.log("user : ", user);
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
    // console.log("reports : ", reports);
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

  const getAllPosts = async () => {
    const response = await fetch(`http://localhost:3000/posts/allposts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAllPosts(data);
    // console.log("All posts : ", data);
  };

  const blockUser = async (reportedById, reportedUser, subgrediitId) => {
    emailjs.init("JTIK-seqM4cuPVyQW");
    // console.log(
    //   " Block the user : ",
    //   reportedUser,
    //   " from subgrediit : ",
    //   subgrediitId
    // );
    const response = await fetch(
      `http://localhost:3000/subgrediits/blockUser/${reportedUser}/${subgrediitId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    const userEmail = allUsers.find((user) => user._id === reportedUser).email;
    const user_name = allUsers.find(
      (user) => user._id === reportedUser
    ).firstName;
    const reportedByEmail = allUsers.find(
      (user) => user._id === reportedById
    ).email;
    const subgrediitModName = subgrediit.moderators[0];

    emailjs.send("service_jnqy9ji", "template_d1gc4qc", {
      from_name: subgrediitModName,
      to_name: user_name,
      message: `As per your report request we have blocked ${user_name} from the subgrediit ${subgrediit.name}`,
      to_emailo: reportedByEmail,
    });

    emailjs.send("service_jnqy9ji", "template_d1gc4qc", {
      from_name: subgrediitModName,
      to_name: user_name,
      message: `You got blocked from the subgrediit ${subgrediit.name}`,
      to_emailo: userEmail,
    });

    // console.log("data : ", data);
    getSubgrediit();
    findReports();
  };

  const ignoreReport = async (
    reportId,
    reportedBy,
    reportedUser,
    reportedSubgrediit
  ) => {
    console.log(" Ignore the report : ", reportId);
    const response = await fetch(
      `http://localhost:3000/reports/ignoreReport/${reportId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("data : ", data);
    const data = await response.json();
    const userEmail = allUsers.find((user) => user._id === reportedUser).email;
    const user_name = allUsers.find(
      (user) => user._id === reportedUser
    ).firstName;
    const reportedByEmail = allUsers.find(
      (user) => user._id === reportedBy
    ).email;
    const subgrediitModName = subgrediit.moderators[0];

    emailjs.send("service_jnqy9ji", "template_d1gc4qc", {
      from_name: subgrediitModName,
      to_name: user_name,
      message: `Your report request for ${user_name} from the subgrediit ${subgrediit.name}, has been ignored`,
      to_emailo: reportedByEmail,
    });

    emailjs.send("service_jnqy9ji", "template_d1gc4qc", {
      from_name: subgrediitModName,
      to_name: user_name,
      message: `There was a report against you in the subgrediit, ${subgrediit.name}. But no need to worry, it has been ignored by the mods`,
      to_emailo: userEmail,
    });
    findReports();
  };

  const deletePost = async (
    postId,
    reportedBy,
    reportedUser,
    reportedSubgrediit
  ) => {
    console.log(" Delete the post : ", postId);
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/delete`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    const userEmail = allUsers.find((user) => user._id === reportedUser).email;
    const user_name = allUsers.find(
      (user) => user._id === reportedUser
    ).firstName;
    const reportedByEmail = allUsers.find(
      (user) => user._id === reportedBy
    ).email;
    const subgrediitModName = subgrediit.moderators[0];

    emailjs.send("service_jnqy9ji", "template_d1gc4qc", {
      from_name: subgrediitModName,
      to_name: user_name,
      message: `As per your report request we have deleted the post from the subgrediit ${subgrediit.name}`,
      to_emailo: reportedByEmail,
    });

    emailjs.send("service_jnqy9ji", "template_d1gc4qc", {
      from_name: subgrediitModName,
      to_name: user_name,
      message: `Your post got deleted from the subgrediit ${subgrediit.name}`,
      to_emailo: userEmail,
    });
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
    getUser();
    findReports();
    getAllUsers();
    getAllSubgrediits();
    getAllPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!subgrediit) return null;
  if (!reports) return null;
  if (!allUsers) return null;
  if (!allSubgrediits) return null;
  if (!allPosts) return null;
  if (!user) return null;

  if (!user.mySubgrediits.includes(subgrediitId)) navigate("/");

  // console.log("subgrediit : ", subgrediit);

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
                  reports.map((report) =>
                    // check if the report is older than 10 days

                    report.createdAt < Date.now() - 10 * 24 * 60 * 60 * 1000 ? (
                      deleteReport(report._id)
                    ) : (
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
                            Associated Post :{" "}
                            {allPosts
                              .filter(
                                (post) => post._id === report.reportedPost
                              )
                              .map((post) => post.title)}
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
                              .filter(
                                (user) => user._id === report.reportedUser
                              )
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
                              deletePost(
                                report.reportedPost,
                                report.reportedBy,
                                report.reportedUser,
                                report.reportedSubgrediit
                              );
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
                                report.reportedBy,
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
                              ignoreReport(
                                report._id,
                                report.reportedBy,
                                report.reportedUser,
                                report.reportedSubgrediit
                              );
                              console.log("Ignore report");
                            }}
                            disabled={report.ignored}
                          >
                            Ignore
                          </Button>
                        </Box>
                      </Box>
                    )
                  )
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
