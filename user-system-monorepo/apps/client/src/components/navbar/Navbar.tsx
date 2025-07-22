import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { useColorMode } from "../../hooks/useColorMode";

interface NavbarProps {
  toggleColorMode: () => void; // אם אתה מקבל את זה בפרופס, תוכל להסיר אם לא
}

const Navbar: React.FC<NavbarProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const { toggleColorMode, mode } = useColorMode();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };

  return (
    <AppBar position="static" dir="rtl">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton onClick={toggleColorMode} color="inherit" aria-label="החלף מצב תאורה">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
          אפליקציית ניהול כרטיסים
        </Typography>

        <Box>
          {user ? (
            <>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => { navigate("/profile"); handleClose(); }}>הפרופיל שלי</MenuItem>
                {user.role === "admin" && (
                  <MenuItem onClick={() => { navigate("/dashboard"); handleClose(); }}>
                    ניהול מערכת
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>התחברות</Button>
              <Button color="inherit" onClick={() => navigate("/register")}>הרשמה</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
