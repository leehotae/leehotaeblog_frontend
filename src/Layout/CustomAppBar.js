import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const loginsettings = ["Account", "Logout"];
const logoutsettings = ["SignIn", "SignUp"];
const CustomAppBar = () => {
  const { pathname } = useLocation();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isLogin, user } = useSelector((store) => store);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(pathname);
  return (
    <>
      <AppBar sx={{ bgcolor: "#084766" }} position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              <Button size="large" sx={{ color: "white" }}>
                <HomeIcon></HomeIcon>
              </Button>
            </Link>
            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={user.profileImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isLogin
                  ? loginsettings.map((setting) => (
                      <Link
                        key={setting}
                        to={"/" + setting.toLowerCase()}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      </Link>
                    ))
                  : logoutsettings.map((setting) => (
                      <Link
                        key={setting}
                        to={"/" + setting.toLowerCase()}
                        state={{ from: pathname }}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      </Link>
                    ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};
export default CustomAppBar;
