import { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const postSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const initialValuesPost = {
  title: "",
  description: "",
};

const CreatePost = ({ getSubgrediitPosts }) => {
  const { palette } = useTheme();
  // const navigate = useNavigate();
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [subgrediit, setSubgrediit] = useState(null);
  const [user, setUser] = useState(null);
  const { subgrediitId } = useParams();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

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

    // console.log(data.bannedKeywords);
  };

  const create = async (values, onSubmitProps) => {
    // check if banned keywords are in the title or description

    let bannedKeywords = subgrediit.bannedKeywords;
    // strip the extra spaces
    bannedKeywords = bannedKeywords.map((keyword) => keyword.trim());

    let title = values.title;
    title = title.toLowerCase();

    for (let i = 0; i < bannedKeywords.length; i++) {
      let regEx = new RegExp(bannedKeywords[i], "ig");
      if (title.match(regEx)) {
        // console.log("title contains banned keyword : " + bannedKeywords[i]);
        toast.error("Title contains banned keyword", {
          display: "absolute",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          progress: undefined,
        });
        return;
      }
      if (values.description.match(regEx)) {
        // console.log("description contains banned keyword : " + bannedKeywords[i]);
        toast.error("Description contains banned keywords", {
          display: "absolute",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          progress: undefined,
        });
        toast.error("The banned keywords will be replaced by asterisks", {
          display: "absolute",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          progress: undefined,
        });

        // replace the banned keywords with asterisks
        let description = values.description;
        description = description.replace(regEx, "*****");
        values.description = description;
      }
    }

    const response = await fetch("http://localhost:3000/posts/createPost", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        userId: user._id,
        subgrediitId: subgrediitId,
      }),
    });
    const data = await response.json();
    // console.log(data);
    if (data.error) {
      toast.error(data.error);
      toast.error("Post not created", {
        display: "absolute",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
    } else {
      toast.success("Post created", {
        display: "absolute",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
      onSubmitProps.resetForm();
    }
    getSubgrediitPosts();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await create(values, onSubmitProps);
  };

  useEffect(() => {
    getUser();
    getSubgrediit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <>
      <ToastContainer />
      <FlexBetween
        alignContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Formik
          initialValues={initialValuesPost}
          validationSchema={postSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} style={{ width: "80%" }}>
              <Box
                display="flex"
                gap="30px"
                flexDirection="column"
                //   gridTemplateColumns="repeat (12, minmax(0, 1fr))"
              >
                <>
                  <TextField
                    label="Title"
                    name="title"
                    value={values.title}
                    error={Boolean(touched.title) && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    sx={{ width: "100%", gridColumn: "span 12" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={values.description}
                    error={
                      Boolean(touched.description) &&
                      Boolean(errors.description)
                    }
                    helperText={touched.description && errors.description}
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </>
              </Box>

              {/* BUTTON */}
              <Box
                alignContent="center"
                alignItems="center"
                flexDirection="column"
                display="flex"
              >
                <Box width="30%">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    sx={{
                      width: "100%",
                      m: "2rem 0",
                      // p: "1rem",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": {
                        color: palette.primary.main,
                      },
                    }}
                    border="1px solid black"
                    borderradius="50%"
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </FlexBetween>
    </>
  );
};

export default CreatePost;
