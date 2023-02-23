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
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// SCHEMA FOR CREATING A REPORT
const reportSchema = yup.object().shape({
  concern: yup.string().required("Concern is required"),
});

// INITIAL VALUES FOR THE FORM
const initialValuesReport = {
  concern: "",
};

const CreateReport = ({
  getSubgrediit,
  handleClose,
  getSubgrediitPosts,
  reportedPost,
  reportedSubgrediit,
  reportedUser,
}) => {
  const { palette } = useTheme();
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

  // ON SUBMITTING THE FORM, SEND THE DATA TO THE SERVER
  const create = async (values, onSubmitProps) => {
    // console.log("Values : ", values.concern);
    const response = await fetch("http://localhost:3000/reports/createReport", {
      method: "POST",
      body: JSON.stringify({
        reportedBy: id,
        concern: values.concern,
        reportedPost: reportedPost,
        reportedSubgrediit: reportedSubgrediit,
        reportedUser: reportedUser,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("Response status : ", response.status);

    const savedReport = await response.json();

    onSubmitProps.resetForm(initialValuesReport);

    toast.success("Report created successfully", {
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

    handleClose();
    getSubgrediit();
    getSubgrediitPosts();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await create(values, onSubmitProps);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  // console.log(reportedPost);
  // console.log("User id : ", id);

  return (
    <>
      <ToastContainer />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesReport}
        validationSchema={reportSchema}
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
                  label="Concern"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.concern}
                  name="concern"
                  error={Boolean(touched.concern) && Boolean(errors.concern)}
                  helperText={touched.concern && errors.concern}
                  sx={{ gridColumn: "span 6" }}
                  multiline
                  minRows="4"
                />
              </>
            </Box>

            {/* BUTTON */}
            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Button
                fullWidth
                color="primary"
                type="submit"
                sx={{
                  width: "50%",
                  m: "1rem 0",
                  mb: "0rem",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": {
                    color: palette.primary.main,
                  },
                }}
              >
                Report Post
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateReport;
