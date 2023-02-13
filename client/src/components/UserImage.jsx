import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box widht={size} height={size}>
    <img
        style={{objectFit: "cover", borderRadius: "50%"}}
        width={size}
        height={size}
        alt="user avatar"
        src="https://images.unsplash.com/photo-1627330000000-8c8c8c8c8c8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
    </Box>
  );
};

export default UserImage;
