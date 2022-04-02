import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./img/logo.png";
import { Link as LinkRouter } from "react-router-dom";
import { connect } from "react-redux";
import { unstable_createStyleFunctionSx } from "@mui/system";
import userAction from "../redux/action/userAction"


const pages = ["Home", "Cities"];
const settings = ["SingIn", "SingUp"];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  function signOut() {
    props.signOut(props.user.email)
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src={Logo} alt="logo" className="logo" />
            <h1 className="titulo">MyTinerary</h1>
          </Typography>

          <Box
            className="hamburguesa"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <LinkRouter key={page.algo} to={page}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <h1 className="titulo">MyTinerary</h1>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <LinkRouter key={page.nav} to={page}>
                <Button
                  className="btn__nav"
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "darkgreen",
                    fontWeight: "700",
                    fontSize: "2rem",
                    fontFamily: "Amatic SC",
                    display: "block",
                  }}
                >
                  {page}
                </Button>
              </LinkRouter>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* icono de usuario */}
            <Tooltip title="Open settings">
              {props.user ? (
                <IconButton
                  className="icono__nav"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 1, mx: 10 }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={props.user.image}
                    variant="rounded"
                  />
                </IconButton>
              ) : (
                <IconButton
                  className="icono__nav"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 1, mx: 10 }}
                >
                  <Avatar alt="Remy Sharp" src="" variant="rounded" />
                </IconButton>
              )}
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

              {props.user ? (

                <button onClick={signOut}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">signOut</Typography>
                  </MenuItem>
                </button>

              ) : (settings.map((setting) => (
                <LinkRouter key={setting} to={setting}>
                  <button>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  </button>
                </LinkRouter>
              )))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
const mapDispatchToProps = {
  signOut: userAction.signOut,
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
