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
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';
import { ref } from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

//
//
// SCHEMAS FOR REGISTER AND LOGIN
//
//
const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  age: yup.number().required("Age is required"),
  contactNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Contact number is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

//
//
// INITIAL VALUES FOR REGISTER AND LOGIN FORMS
//
//

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  age: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
  profilePicture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  //
  //
  // ON SUBMITTING THE REGISTER FORM, SEND THE DATA TO THE SERVER
  //
  //

  const register = async (values, onSubmitProps) => {
    // console.log("Registering user : ", values);
    const formData = new FormData();
    for (let value in values) {
      if (value !== "profilePicture") formData.append(value, values[value]);
    }
    if (values.profilePicture)
      formData.append("profilePicture", values.profilePicture.name);

    // console.log("Form data : ", formData);
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: formData,
    });

    // console.log("Response status : ", response.status);

    // IF THE EMAIL ALREADY EXISTS, SHOW AN ERROR
    if (response.status === 409) {
      console.log("Email already exists");
      alert("Email already exists");
      return;
    }

    const savedUser = await response.json();
    // console.log("Saved user : ", savedUser);
    onSubmitProps.resetForm();
    toast.success("User registered successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      progress: undefined,
    });
    // alert("User registered successfully");
    if (savedUser) {
      setPageType("login");
    }
  };

  //
  //
  // ON SUBMITTING THE LOGIN FORM, SEND THE DATA TO THE SERVER
  //
  //

  const login = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const loggedIn = await response.json();
    if (response.status === 409) {
      // console.log("Account not found");
      toast.error("Account not found", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // alert("Account not found");
      return;
    }
    if (response.status === 400) {
      // console.log("Invalid credentials");
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    // console.log("Logged in : ", loggedIn);

    toast.success("Logged in successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // console.log("Values : ", values);
    if (isLogin) await login(values, onSubmitProps);
    else await register(values, onSubmitProps);
  };

  return (
    <>
      <ToastContainer />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={!isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
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
              gridTemplateColumns="repeat(4, minmax(0,1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userName}
                    name="userName"
                    error={
                      Boolean(touched.userName) && Boolean(errors.userName)
                    }
                    helperText={touched.userName && errors.userName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Age"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.age}
                    name="age"
                    error={Boolean(touched.age) && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Contact Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contactNumber}
                    name="contactNumber"
                    error={
                      Boolean(touched.contactNumber) &&
                      Boolean(errors.contactNumber)
                    }
                    helperText={touched.contactNumber && errors.contactNumber}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setFieldValue("profilePicture", acceptedFiles[0]);
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
                          {!values.profilePicture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography variant="body1">
                                {values.profilePicture.name}
                              </Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              {isLogin && (
                <>
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.passwPageord}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}
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
                disabled={
                  isLogin
                    ? !(
                        values.email &&
                        values.password &&
                        !errors.email &&
                        !errors.password
                      )
                    : !(
                        !errors.firstName &&
                        !errors.lastName &&
                        !errors.userName &&
                        !errors.email &&
                        !errors.age &&
                        !errors.contactNumber &&
                        !errors.password &&
                        !errors.confirmPassword &&
                        values.firstName &&
                        values.lastName &&
                        values.userName &&
                        values.email &&
                        values.age &&
                        values.contactNumber &&
                        values.password &&
                        values.confirmPassword
                      )
                }
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  // console.log("pageType : ", pageType);
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign up here"
                  : "Already have an account? Login here"}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
