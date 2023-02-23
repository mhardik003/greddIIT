import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { toast, ToastContainer } from "react-toastify";
// import {Prompt} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
// import { useParams } from "react-router-dom";
// import Navbar from "scenes/navbar";
// import FlexBetween from "components/FlexBetween";
// import UserImage from "components/UserImage";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { Formik, FormikConsumer } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactRouterPrompt from "react-router-prompt";


const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contactNumber: Yup.string().matches(phoneRegExp,"Phone number is not valid").required("Contact number is required"),
  age: Yup.number().required("Age is required"),
});

const Form = ({ userId, userData }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const getUser = async () => {
    setUser(userData);
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const { firstName, lastName, userName, email, contactNumber, age } = user;

  const showToastMessage = () => {
    // console.log("Toast message");
    toast.success("User Profile Updated", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const checkDirty = (values) => {
    if (
      values.firstName === user.firstName &&
      values.lastName === user.lastName &&
      values.userName === user.userName &&
      values.email === user.email &&
      values.contactNumber === user.contactNumber &&
      values.age === user.age
    ) {
      setIsDirty(false);
    } else {
      setIsDirty(true);
    }
  };

  const EditUserData = async (values, onSubmitProps) => {
    // console.log("userId : ", userId);

    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    // console.log("JSON format : ", JSON.stringify(values));
    // console.log("Form data : ", formData);
    const response = await fetch(`http://localhost:3000/users/edit/${userId}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("JSON format after request: ", JSON.stringify(values));

    // console.log("Response status : ", response.body);
    if (response.status === 401) {
      alert("You are not authorized to edit this user");
      return;
    }

    await response.json();

    // const savedUser = await response.json();
    // console.log("Saved user : ", savedUser);
    onSubmitProps.resetForm({
      values: {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        contactNumber: values.contactNumber,
        age: values.age,
      },
    });

    showToastMessage();
    dispatch(
      setLogin({
        user: {
          id: userId,
          firstName: values.firstName,
          lastName: values.lastName,
          userName: values.userName,
          email: values.email,
          contactNumber: values.contactNumber,
          age: values.age,
        },
        token: token,
      })
    );
    setTimeout(() => {
      window.location.reload(false);
    }, 3000);
    // alert("User info edited successfully");
    console.log("VS code git is awesome");
    navigate(`/profile/${userId}`);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await EditUserData(values, onSubmitProps);

    // console.log("onSubmitProps : ", onSubmitProps);
    // console.log("values : ", values);
    // console.log("values firstName: ", values.firstName);

    // toast for form success
  };

  return (
    <div>
      <ToastContainer />
      {/* warn the user if they are about to leave the page with unsaved changes */}
      {/* <FormikConsumer>
        {(formik) => (
          <Prompt
            when={formik.dirty}
            message="Are you sure you want to leave?"
          />
        )}
      </FormikConsumer> */}
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          contactNumber: contactNumber,
          age: age,
        }}
        validationSchema={profileSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
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
              <TextField
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={Boolean(touched.userName) && Boolean(errors.userName)}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                disabled
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
            </Box>

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
                Edit Details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
