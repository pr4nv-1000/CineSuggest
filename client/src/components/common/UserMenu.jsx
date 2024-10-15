import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";
import userApi from "../../api/modules/user.api";
import { toast } from "react-toastify";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);


  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const { response, err } = await userApi.removeUser(); 
        if (response) {
          dispatch(setUser(null)); 
          toast.success("User account deleted successfully.");
        } else {
          toast.error("Failed to delete account:", err);
        }
      } catch (err) {
        console.error("Error occurred during account deletion:", err);
      }
    }
  };

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText disableTypography primary={
                  <Typography textTransform="uppercase">{item.display}</Typography>
                } />
              </ListItemButton>
            ))}
            
            {/* Sign Out Button */}
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => {
                dispatch(setUser(null)); // Log out user
                setAnchorEl(null); // Close menu
              }}
            >
              <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
              <ListItemText disableTypography primary={
                <Typography textTransform="uppercase">sign out</Typography>
              } />
            </ListItemButton>

            {/* Delete Account Button */}
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={handleDeleteAccount} // Call delete handler
            >
              <ListItemIcon><DeleteOutlineIcon /></ListItemIcon>
              <ListItemText disableTypography primary={
                <Typography textTransform="uppercase" color="error">delete account</Typography>
              } />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
