import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import CreatePost from "./CreatePost";
import FlexBetween from "components/FlexBetween";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";

const Posts = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [user, setUser] = useState(null);
  const [subgrediit, setSubgrediit] = useState(null);
  const { subgrediitId } = useParams();
  const token = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    // console.log("user : ", user);
  };

  // const getAllSubgrediits = async () => {
  //   const response = await fetch(
  //     `http://localhost:3000/subgrediits/getAllSubgrediits/${id}`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   const data = await response.json();
  //   setAllSubgrediits(data);
  //   // console.log("All subgrediits : ", data);
  // };

  const getPosts = async () => {
    const response = await fetch(
      `http://localhost:3000/subgrediits/find/${subgrediitId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setSubgrediit(data);
    console.log("Subgrediit : ", data);
    console.log("Subgrediit Posts : ", data.posts);
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  if (!subgrediit) return null;
  console.log("Subgrediit Postees : ", subgrediit);

  return (
    <>
      <Navbar />
      <Box>
        <Grid spacing={1} container justifyContent="center" direction="row">
          <Grid
            item
            xs={0}
            md={3}
            lg={2}
            container
            spacing={2}
            alignItems="center"
            justifyContent="left"
            style={{ minHeight: "100vh" }}
          ></Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={8}
            container
            spacing={2}
            alignItems="top"
            justifyContent="left"
            style={{ minHeight: "100vh" }}
          >
            <Box
              width={isNonMobileScreens ? "80%" : "83%"}
              p="2rem 0.5rem 0rem 0.5rem"
              m="2rem auto"
              mt="0.5rem"
              // mb="1rem"
              borderRadius="1.5rem"
              // backgroundColor={theme.palette.background.alt}
            >
              <Typography
                textAlign="center"
                fontWeight="500"
                variant="h2"
                color="primary"
                // sx={{ mb: "1.5rem" }}
              >
                Posts from {subgrediit.name}
              </Typography>
            </Box>
            <Box
              width={isNonMobileScreens ? "50%" : "83%"}
              p="2rem 0.5rem 1rem 0.5rem"
              m="2rem auto"
              mt="0rem"
              mb="1rem"
              borderRadius="1.5rem"
              backgroundColor={theme.palette.background.alt}
            >
              <Typography
                textAlign="center"
                fontWeight="500"
                variant="h2"
                color="primary"
                sx={{ mb: "1.5rem" }}
              >
                Create Post
              </Typography>
              <CreatePost />
            </Box>
            {/* check if there are any posts */}
            {subgrediit.posts.length > 0 ? (
              <Box
                width={isNonMobileScreens ? "80%" : "83%"}
                p="2rem 0.5rem 1rem 0.5rem"
                m="1rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
              >
                <Typography
                  textAlign="center"
                  fontWeight="500"
                  variant="h2"
                  color="primary"
                  sx={{ mb: "1.5rem" }}
                >
                  All Posts
                </Typography>

                {subgrediit.posts.map((post) => (
                  <Box
                    key={post.id}
                    width={isNonMobileScreens ? "80%" : "83%"}
                    p="1rem 0.5rem 1rem 0.5rem"
                    m="1rem auto"
                    borderRadius="1.5rem"
                    backgroundColor="background.paper"
                  >
                    <FlexBetween pb="0.5rem">
                      <Typography
                        textAlign="left"
                        p="0.5rem"
                        fontWeight="500"
                        variant="h4"
                        color="primary"
                        // sx={{ mb: "1.5rem" }}
                      >
                        {post.title}
                      </Typography>

                      {/* check if the user has created the post */}
                      {post.postedBy === user._id && (
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Delete Post");
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </FlexBetween>
                    <Divider />
                    <Typography
                      textAlign="left"
                      fontWeight="500"
                      variant="body1"
                      color="paper"
                      p="0.5rem"
                    >
                      {post.description}
                    </Typography>
                    <Typography
                      textAlign="center"
                      fontWeight="500"
                      variant="h2"
                      color="primary"
                      sx={{ mb: "1.5rem" }}
                    >
                      {post.postedBy.userName}
                    </Typography>
                    {/* Buttons for upvoting and downvoting */}
                    <Box p="0.5rem">
                      <FlexBetween>
                        {/* comments button */}
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Comments");
                          }}
                        >
                          <CommentIcon />( {post.comments.length} )
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Upvote");
                          }}
                        >
                          <ArrowCircleUpOutlinedIcon />
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Downvote");
                          }}
                        >
                          <ArrowCircleDownOutlinedIcon />
                        </Button>

                        {/* Save for later */}
                        <Button
                          // align the button to the right

                          variant="contained"
                          color="info"
                          sx={{ mr: "1rem", ml: "auto" }}
                          onClick={() => {
                            console.log("post.postedBy._id : ", post.postedBy);
                            console.log("user._id : ", user._id);
                            console.log("Save for later");
                          }}
                        >
                          <BookmarkBorderOutlinedIcon />
                        </Button>
                      </FlexBetween>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                width={isNonMobileScreens ? "80%" : "83%"}
                p="2rem 0.5rem 1rem 0.5rem"
                m="1rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
              >
                <Typography
                  textAlign="center"
                  fontWeight="500"
                  variant="h2"
                  color="primary"
                  sx={{ mb: "1.5rem" }}
                >
                  No Posts
                </Typography>
              </Box>
            )}

            <Box
              width={isNonMobileScreens ? "80%" : "83%"}
              p="2rem 0.5rem 1rem 0.5rem"
              m="1rem auto"
              style={{ marginBottom: "100rem" }}
              borderRadius="1.5rem"
              // backgroundColor={theme.palette.background.alt}
            ></Box>
          </Grid>
          <Grid
            item
            xs={0}
            md={3}
            lg={2}
            container
            spacing={2}
            alignItems="center"
            justifyContent="left"
            style={{ minHeight: "100vh" }}
          ></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Posts;
