import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userState } from "../redux/authSlice";

const Navbar = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userState(false));
    navigator("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Resume Ats Checker
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              borderRadius: "5px",
              border: "1px solid white",
            }}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
