import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import CreatePost from "./CreatePost";
import FlexBetween from "components/FlexBetween";
import ReportPost from "./ReportPost";

import {
  Box,
  useMediaQuery,
  Typography,
  Grid,
  useTheme,
  Divider,
  Button,
  IconButton,
  Avatar,
  TextField,
} from "@mui/material";

import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  Bookmark as BookmarkIcon,
  Upload as UploadIcon,
  UploadOutlined as UploadOutlinedIcon,
  Download as DownloadIcon,
  DownloadOutlined as DownloadOutlinedIcon,
  PersonRemove as PersonRemoveIcon,
  Delete as DeleteIcon,
  Comment as CommentIcon,
  PersonAddAlt as PersonAddAltIcon,
} from "@mui/icons-material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem ",
};

const Posts = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allSubgrediits, setAllSubgrediits] = useState([]);
  const [reportedPost, setReportedPost] = useState(null);
  const [reportedSubgrediit, setReportedSubgrediit] = useState(null);
  const [reportedUser, setReportedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [subgrediit, setSubgrediit] = useState(null);
  const { subgrediitId } = useParams();
  const token = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.user);
  const [showComments, setShowComments] = useState(false);

  const getUser = async () => {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const getAllUsers = async () => {
    const response = await fetch(`/api/users/getAllUsers`, {
      method: "GET",
    });
    const data = await response.json();
    setAllUsers(data);
  };

  const getAllSubgrediits = async () => {
    const response = await fetch(
      `/api/subgrediits/getAllSubgrediits/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setAllSubgrediits(data);
  };

  const getSubgrediit = async () => {
    const response = await fetch(
      `/api/subgrediits/find/${subgrediitId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setSubgrediit(data);
    // console.log("Subgrediit : ", data);
  };

  const getSubgrediitPosts = async () => {
    const response = await fetch(
      `/api/posts/get/${subgrediitId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setPosts(data);
    // console.log("Subgrediit Posts : ", data);
  };

  const deletePost = async (postId) => {
    const response = await fetch(
      `/api/posts/${postId}/delete`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return console.log(data.error);
    }

    toast.success("Post Deleted Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    getSubgrediitPosts();
  };

  const upvotePost = async (postId) => {
    const response = await fetch(
      `/api/posts/${postId}/${id}/upvote`,
      {
        body: JSON.stringify({ userId: id }),
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return console.log(data.error);
    }
    getUser();
    getSubgrediitPosts();
  };

  const downvotePost = async (postId) => {
    // console.log("downvotePost : ", postId);
    const response = await fetch(
      `/api/posts/${postId}/${id}/downvote`,
      {
        body: JSON.stringify({ userId: id }),
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return console.log(data.error);
    }

    getSubgrediitPosts();
  };

  const savePost = async (postId) => {
    // console.log("savePost : ", postId);
    const response = await fetch(
      `/api/posts/${postId}/${id}/save`,
      {
        body: JSON.stringify({ userId: id }),
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );

    const data = await response.json();
    if (data.error) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return console.log(data.error);
    }

    getSubgrediitPosts();
  };

  const followUser = async (userId) => {
    const response = await fetch(
      `/api/users/AddRemoveFollowing/${id}/${userId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    await response.json();
    // if (data.error) {
    //   toast.error(data.error, {
    //     position: "top-center",
    //     autoClose: 2000,

    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return console.log(data.error);
    // }
    getUser();
    getAllUsers();
    getSubgrediit();
    getSubgrediitPosts();
  };

  useEffect(() => {
    getUser();
    getAllUsers();
    getSubgrediit();
    getSubgrediitPosts();
    getAllSubgrediits();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  if (!subgrediit) return null;
  if (!posts) return null;
  if (!allSubgrediits) return null;

  // check if the subgrediitId is in the list of subgrediits
  if (allSubgrediits.length > 0) {
    if (!allSubgrediits.some((subgrediit) => subgrediit._id === subgrediitId)) {
      console.log("Subgrediit not found");
      console.log(allSubgrediits);
      navigate("/404");
    }
  }

  if(!subgrediit.followers.includes(id)) navigate("/")

  // console.log("Subgrediit BannnedKeywords : ", subgrediit.bannedKeywords);
  return (
    <>
      <Navbar />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReportPost
            getSubgrediit={getSubgrediit}
            handleClose={handleClose}
            getSubgrediitPosts={getSubgrediitPosts}
            reportedPost={reportedPost}
            reportedSubgrediit={reportedSubgrediit}
            reportedUser={reportedUser}
          />
        </Box>
      </Modal>
      <Box>
        <Grid spacing={1} container justifyContent="center" direction="row">
          <Grid
            item
            xs={0}
            sm={0}
            md={1}
            lg={3}
            container
            // spacing={2}
            alignItems="center"
            justifyContent="left"
          >
            <Box
              width={isNonMobileScreens ? "80%" : "83%"}
              p="2rem"
              m="2rem auto"
              // mt="2rem"
              // mb="1rem"
              borderRadius="1.5rem"
              backgroundColor={theme.palette.background.alt}
            >
              <Avatar
                alt="Remy Sharp"
                sx={{
                  width: 200,
                  height: 200,
                  m: "auto",
                }}
                alignItems="center"
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              />
              <Typography
                textAlign="center"
                fontWeight="500"
                variant="h2"
                color={theme.palette.text.primary}
                sx={{ mt: "1.5rem" }}
              >
                {subgrediit.name}
              </Typography>
              <Typography
                textAlign="center"
                fontWeight="500"
                variant="body2"
                color={theme.palette.text.primary}
                sx={{ mt: "0.5rem", mb: "1.5rem" }}
              >
                {subgrediit.description}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={10}
            lg={8}
            container
            spacing={2}
            alignItems="top"
            justifyContent="left"
            style={{ minHeight: "100vh" }}
          >
            <Box
              width="50%"
              p="2rem 0.5rem 1rem 0.5rem"
              m="2rem auto"
              mt="5rem"
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
              <CreatePost getSubgrediitPosts={getSubgrediitPosts} />
            </Box>
            {/* check if there are any posts */}
            {posts.length > 0 ? (
              <Box
                key={subgrediitId}
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

                {posts.map((post) => (
                  <Box
                    key={post._id}
                    width={isNonMobileScreens ? "80%" : "83%"}
                    p="1rem 0.5rem 1rem 0.5rem"
                    m="1rem auto"
                    borderRadius="1.5rem"
                    backgroundColor="background.paper"
                  >
                    <FlexBetween pb="0rem">
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
                            deletePost(post._id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </FlexBetween>
                    <Typography
                      textAlign="left"
                      fontWeight="500"
                      variant="body2"
                      color="#666666"
                      sx={{ mb: "0.5rem", pl: "0.5rem" }}
                    >
                      Created By : @{""}
                      {subgrediit.blockedFollowers.includes(post.postedBy)
                        ? "Blocked User"
                        : allUsers.find((user) => user._id === post.postedBy)
                            .userName}
                      {/* button to follow the user */}
                      {user._id !== post.postedBy && (
                        <IconButton
                          variant="contained"
                          color={theme.palette.background.alt}
                          size="small"
                          sx={{
                            ml: "0.2rem",
                          }}
                          onClick={() => {
                            console.log("Follow User");
                            followUser(post.postedBy);
                          }}
                        >
                          {/* check if the user is already followed */}
                          {user.following.includes(post.postedBy) ? (
                            <PersonRemoveIcon />
                          ) : (
                            <PersonAddAltIcon />
                          )}
                        </IconButton>
                      )}
                    </Typography>
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
                      {/* {post.postedBy} */}
                    </Typography>
                    {/* Buttons for upvoting and downvoting */}
                    <Box p="0.5rem">
                      <FlexBetween>
                        {/* comments button */}
                        <Button
                          // variant="contained"
                          // color="primary"
                          // sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Comments");
                            setShowComments(!showComments);
                          }}
                        >
                          <CommentIcon />( {post.comments.length} )
                        </Button>

                        <Button
                          // variant="contained"
                          // color="success"
                          // sx={{ mr: "1rem" }}
                          onClick={() => {
                            console.log("Upvote");
                            upvotePost(post._id);
                          }}
                        >
                          {/* check if the user has already upvoted the post */}
                          {post.upvotes.includes(user._id) ? (
                            <UploadIcon />
                          ) : (
                            <UploadOutlinedIcon />
                          )}
                          ( {post.upvotes.length} )
                        </Button>
                        <Button
                          onClick={() => {
                            console.log("Downvote");
                            downvotePost(post._id);
                          }}
                        >
                          {/* check if the user has already downvoted the post */}
                          {post.downvotes.includes(user._id) ? (
                            <DownloadIcon />
                          ) : (
                            <DownloadOutlinedIcon />
                          )}
                          ( {post.downvotes.length} )
                        </Button>

                        {/* Save for later */}
                        <IconButton
                          sx={{ mr: "1rem", ml: "auto" }}
                          onClick={() => {
                            console.log("Save for later");
                            savePost(post._id);
                          }}
                        >
                          {/* check if the user has already saved the post */}

                          {post.savedBy.includes(user._id) ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderOutlinedIcon />
                          )}
                        </IconButton>

                        {post.postedBy !== user._id && (
                          <IconButton
                            variant="contained"
                            color={theme.palette.background.alt}
                            size="small"
                            sx={{
                              ml: "0.2rem",
                            }}
                            onClick={() => {
                              console.log("Report Post");
                              setReportedPost(post._id);
                              setReportedSubgrediit(post.postedIn);
                              setReportedUser(post.postedBy);
                              handleOpen();
                            }}
                          >
                            <ReportGmailerrorredIcon />
                          </IconButton>
                        )}
                      </FlexBetween>

                      {showComments && (
                        <Box>
                          <Box
                            width={isNonMobileScreens ? "100%" : "83%"}
                            p="1rem 0.5rem 1rem 0.5rem"
                            m="1rem auto"
                            borderRadius="1.5rem"
                            backgroundColor={theme.palette.background.alt}
                          >
                            <FlexBetween>
                            <TextField
                              fullWidth
                              id="standard-basic"
                              label=" Add Comment"
                              variant="standard"
                              size="small"
                              width="50%"
                              sx={{
                                ml: "1rem",

                              }}
                              // value={comment}
                              // onChange={(e) => setComment(e.target.value)}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                ml: "3rem",
                              }}
                              size="small"
                              onClick={() => {
                                console.log("Add");
                                // addComment(post._id);
                              }}
                            >
                              Add 
                            </Button>
                            </FlexBetween>
                          {post.comments.map((comment) => (
                            <Box
                              width={isNonMobileScreens ? "100%" : "83%"}
                              p="1rem 0.5rem 1rem 0.5rem"
                              // m="1rem auto"
                              borderRadius="1.5rem"
                              backgroundColor={theme.palette.background.alt}
                            >
                              <Typography
                                textAlign="left"
                                fontWeight="500"
                                variant="body1"
                                color="paper"
                                p="0.5rem"
                                ml="1rem"
                              >
                                * {comment}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      )}
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
          </Grid>
          <Grid
            item
            xs={0}
            sm={0}
            md={1}
            lg={2}
            container
            spacing={2}
            alignItems="center"
            justifyContent="left"
          ></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Posts;
