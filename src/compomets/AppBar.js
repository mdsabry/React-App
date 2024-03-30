import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import logo from "../logo.png";

import {
  AccountCircleOutlined,
  FavoriteBorder,
  Logout,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookMarkItem from "./BookMarkItem";

export default function Appbar() {
  const { cart, favs } = useSelector((state) => state);
  const navigator = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ color: "error", backgroundColor: "error" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show Cart"
          color="inherit"
          onClick={() => {
            if (localStorage.getItem("name")) {
              navigator("/labtopi/cart");
              setMobileMoreAnchorEl(null);
            } else {
              navigator("/labtopi/login");
            }
          }}
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartOutlined sx={{ color: "#000000" }} />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show Favourites"
          color="inherit"
          onClick={() => {
            if (localStorage.getItem("name")) {
              setMobileMoreAnchorEl(null);
              setOpenDrawer(!openDrawer);
            } else {
              navigator("/labtopi/login");
            }
          }}
        >
          <Badge badgeContent={favs.length} color="error">
            <FavoriteBorder sx={{ color: "#000000" }} />
          </Badge>
        </IconButton>
        <p>Favourites</p>
      </MenuItem>
      <MenuItem>
        &nbsp;
        {localStorage.getItem("name") == null ? null : (
          <IconButton>
            <Badge>
              <LogoutOutlined />
            </Badge>
          </IconButton>
        )}
        <Account />
        <p>&nbsp;{localStorage.getItem("name") ? "" : " Profile"}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#eeeeee" }}>
        <div className="container">
          <Toolbar>
            <img
              style={{ width: 50 + "px", height: 50 + "px" }}
              src={logo}
              alt={"logo"}
            />

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                onClick={() => {
                  if (localStorage.getItem("name")) {
                    navigator("/labtopi/cart");
                  } else {
                    navigator("/labtopi/login");
                  }
                }}
                size="large"
                aria-label="show Cart"
                color="inherit"
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartOutlined sx={{ color: "#000000" }} />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                onClick={() => {
                  if (localStorage.getItem("name")) {
                    setOpenDrawer(!openDrawer);
                  } else {
                    navigator("/labtopi/login");
                  }
                }}
              >
                <Badge badgeContent={favs.length} color="error">
                  <FavoriteBorder sx={{ color: "#000000" }} />
                </Badge>
              </IconButton>
              <Account />
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </div>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(!openDrawer);
        }}
      >
        <Box sx={{ width: 400 }} role="presentation">
          <List>
            {favs.map((fav, index) => (
              <ListItem key={fav} disablePadding>
                <ListItemButton>
                  <BookMarkItem id={fav} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}

function Account() {
  const navigator = useNavigate();

  if (localStorage.getItem("name")) {
    return (
      <IconButton
        size="small"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={() => {
          localStorage.clear();
          navigator("/labtopi/login");
        }}
        color="inherit"
      >
        <span style={{ color: "black" }}>Logout</span>
      </IconButton>
    );
  } else {
    return (
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={() => {
          navigator("/labtopi/login");
        }}
        color="inherit"
      >
        <AccountCircleOutlined sx={{ color: "#000000" }} />
      </IconButton>
    );
  }
}
