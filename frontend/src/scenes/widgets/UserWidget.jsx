import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import {
  Box,
  useMediaQuery,
  Divider,
  useTheme,
  Typography,
} from "@mui/material";

import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
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

  const {
    firstName,
    lastName,
    userName,
    email,
    contactNumber,
    age,
    followers,
    following,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h3"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: pallette.primary.light,
                },
              }}
            >
              {userName}
            </Typography>
            <Typography
              variant="h6"
              color={dark}
              fontWeight="200"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: pallette.primary.light,
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{followers.length} Followers</Typography>
            <Typography color={medium}>{following.length} Following</Typography>
          </Box>
          <ManageAccountsOutlined />
        </FlexBetween>
        <Divider />
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem"></Box>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};
