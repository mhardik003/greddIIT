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

//
// SCHEMA FOR CREATING A SUBGREDIIT
const subgrediitSchema = yup.object().shape({
  name: yup.string().required("Subgrediit name is required"),
  description: yup.string().required("Description is required"),
  tags: yup.string().required("Tags are required"),
  bannedKeywords: yup.string(),
  subgrediitPicture: yup.string(),
});

//
// INITIAL VALUES FOR THE FORM
const initialValuesSubgrediit = {
  name: "",
  description: "",
  tags: "",
  bannedKeywords: "",
  subgrediitPicture: "",
};

const CreateSubgrediit = () => {
  const { palette } = useTheme();
  // const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

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

  if (!user) return null;

  //
  // ON SUBMITTING THE FORM, SEND THE DATA TO THE SERVER
  const create = async (values, onSubmitProps) => {
    console.log("Values from the form : ", values);
    const formData = new FormData();
    for (let value in values) {
      if (value !== "profilePicture") formData.append(value, values[value]);
    }
    if (values.subgrediitPicture) {
      values.subgrediitPicture = values.subgrediitPicture.name;
    }
    // if (values.profilePicture)

    // values.push({"moderator": user, "followers": user, "posts": []})

    console.log("Form data : ", JSON.stringify(values));

    const response = await fetch(
      "http://localhost:3000/subgrediits/createSubgrediit",
      {
        method: "POST",
        body: JSON.stringify({
          values,
          moderator: user,
          followers: user,
          posts: [],
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response status : ", response.status);

    const savedSubgrediit = await response.json();
    console.log("Saved Subgrediit : ", savedSubgrediit);

    onSubmitProps.resetForm(initialValuesSubgrediit);

    toast.success("Subgrediit created successfully", {
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

    setTimeout(() => {
      window.location.reload(false);
    
    }, 3000);



  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // console.log("Values : ", values);
    await create(values, onSubmitProps);
  };

  return (
    <>
      <ToastContainer />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesSubgrediit}
        validationSchema={subgrediitSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(6, minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
              }}
            >
              <>
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Comma seperated Tags"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tags}
                  name="tags"
                  error={Boolean(touched.tags) && Boolean(errors.tags)}
                  helperText={touched.tags && errors.tags}
                  sx={{ gridColumn: "span 3" }}
                />
                <TextField
                  label="Comma seperated banned keywords"
                  
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bannedKeywords}
                  name="bannedKeywords"
                  error={
                    Boolean(touched.bannedKeywords) &&
                    Boolean(errors.bannedKeywords)
                  }
                  helperText={touched.bannedKeywords && errors.bannedKeywords}
                  sx={{ gridColumn: "span 3" }}
                />

                <Box
                  gridColumn="span 6"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("subgrediitPicture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.subgrediitPicture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography variant="body1">
                              {values.subgrediitPicture.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            </Box>

            {/* BUTTON */}
            <Box>
              <Button
                fullWidth
                color="primary"
                type="submit"
                sx={{
                  width: "100%",
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": {
                    color: palette.primary.main,
                  },
                }}
              >
                Create Subgrediit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateSubgrediit;
