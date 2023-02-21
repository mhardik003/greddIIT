import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "state";
import Dropzone from "react-dropzone";
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

const CreatePost = ({getPosts}) => {
  const { palette } = useTheme();
  // const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
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

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const create = async (values, onSubmitProps) => {
    console.log(values);
    // const formData = new FormData();
    // formData.append("title", values.title);
    // formData.append("description", values.description);
    // formData.append("subgrediitId", subgrediitId);
    // formData.append("userId",user._id);
    const toBeSent = {
      title: values.title,
      description: values.description,
      subgrediitId: subgrediitId,
      userId: user._id,
    };

    console.log(toBeSent);

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
    console.log(data);
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
    getPosts();
   
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await create(values, onSubmitProps);
  };

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
