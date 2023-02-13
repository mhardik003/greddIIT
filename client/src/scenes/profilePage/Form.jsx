import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useParams } from "react-router-dom";
// import Navbar from "scenes/navbar";
// import FlexBetween from "components/FlexBetween";
// import UserImage from "components/UserImage";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contactNumber: Yup.string().required("Contact number is required"),
  age: Yup.number().required("Age is required"),
});

const Form = ({ userId, userData }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    // const response = await fetch(`http://localhost:3000/users/${userId}`, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // const data = await response.json();
    setUser(userData);
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const {
    firstName,
    lastName,
    userName,
    email,
    contactNumber,
    age,
  } = user;


  const showToastMessage = () => {
    console.log("Toast message");
    toast.success("User Profile Updated", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
    // alert("User info edited successfully");
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
