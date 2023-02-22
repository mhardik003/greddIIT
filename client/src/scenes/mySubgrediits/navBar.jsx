import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Modal,
  Button,
  Divider,
  Backdrop,
  Fade,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Search, DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import CreateSubgrediit from "./CreateSubgrediit";

const Navbar = ({getMySubgrediits}) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // console.log("user from navbar : ", user);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const [openCreateSubgrediit, setOpenCreateSubgrediit] = useState(false);
  const handleOpenCreateSubgrediit = () => setOpenCreateSubgrediit(true);
  const handleCloseCreateSubgrediit = () => setOpenCreateSubgrediit(false);

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <Modal
        open={openCreateSubgrediit}
        onClose={handleCloseCreateSubgrediit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openCreateSubgrediit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#F6F6F6",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            pt: 2,
            px: 4,
            pb: 3,
            bgcolor: alt,
          }}
        >
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h2"
              textAlign="center"
              fontWeight="bold"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              Create Subgrediit
            </Typography>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box
            id="modal-modal-description"
            sx={{
              alignItems: "center",
              mt: 2,
              justifyContent: "center",
              p: 2,
              borderRadius: 2,
              pt: 2,
              px: 4,
              pb: 3,
              m: 2,
            }}
          >
            <CreateSubgrediit getMySubgrediits={getMySubgrediits} handleCloseCreateSubgrediit={handleCloseCreateSubgrediit}/>
          </Box>
        </Box>
        </Fade>
      </Modal>

      <FlexBetween padding="1rem 6%" backgroundColor={alt}
        borderBottom="1px solid #e6e6e6">
      
      
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {/* <HomeOutlinedIcon sx={{ fontSize: "25px" }} /> */}
            GredIIT
          </Typography>
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenCreateSubgrediit}
            >
              <AddBoxOutlinedIcon
                sx={{ fontSize: "25px" }}
                onClick={handleOpenCreateSubgrediit}
              />
            </Button>
            <SmartToyOutlinedIcon
              sx={{
                fontSize: "25px",
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/")}
            />
            <QuestionAnswerOutlinedIcon sx={{ fontSize: "25px" }} />
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {/* <Notifications sx={{ fontSize: "25px" }} /> */}

            <FormControl variant="standard" value={fullName}>
              <InputLabel id="select-label">{fullName}</InputLabel>
              <Select
                id="select-label"
                label={fullName}
                value={fullName}
                placeholder={fullName}
                renderValue={(selected) => {
                  if (selected.length === 0) return { fullName };
                  else return selected;
                }}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem
                  value={fullName}
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  <Typography>Profile Page</Typography>
                </MenuItem>
                <MenuItem
                  value="My SubGreddits"
                  onClick={() => navigate(`/mysubgrediits/`)}
                >
                  <Typography>My SubGreddits</Typography>
                </MenuItem>
                <MenuItem
                  value="Saved Posts"
                  onClick={() => navigate(`/savedposts`)}
                >
                  <Typography>Saved Posts</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenCreateSubgrediit}
              >
                <AddBoxOutlinedIcon
                  sx={{ fontSize: "25px" }}
                  onClick={handleOpenCreateSubgrediit}
                />
              </Button>
              <SmartToyOutlinedIcon
                sx={{
                  fontSize: "25px",
                  "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                  },
                }}
              />
              <QuestionAnswerOutlinedIcon sx={{ fontSize: "25px" }} />
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              {/* <Notifications sx={{ fontSize: "25px" }} /> */}

              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  renderValue={(selected) => {
                    if (selected.length === 0) return { fullName };
                    else return selected;
                  }}
                  sx={{
                    backgroundColor: neutralLight,

                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem
                    value={fullName}
                    onClick={() => navigate(`/profile/${user.id}`)}
                  >
                    <Typography>Profile Page</Typography>
                  </MenuItem>
                  <MenuItem
                    value="My SubGreddits"
                    onClick={() => navigate(`/mysubgrediits/`)}
                  >
                    <Typography>My SubGreddits</Typography>
                  </MenuItem>
                  <MenuItem
                  value="Saved Posts"
                  onClick={() => navigate(`/savedposts`)}
                >
                  <Typography>Saved Posts</Typography>
                </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
};

export default Navbar;
