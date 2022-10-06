import * as React from "react";
import { ReactElement, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Logo } from "./Logo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigation } from "../constant/navigation";

interface Props {
  pages: { label: string; location: string }[];
  username?: string;
}

export const Header = (props: Props): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  return (
    <AppBar position={"static"}>
      <Container maxWidth={"xl"}>
        <Toolbar disableGutters>
          <Box
            sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}
          >
            <Logo />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size={"large"}
              aria-label={"account of current user"}
              aria-controls={"menu-appbar"}
              aria-haspopup={"true"}
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color={"inherit"}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id={"menu-appbar"}
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {props.pages.map((page) => (
                <MenuItem key={page.label} onClick={() => setAnchorElNav(null)}>
                  <Typography textAlign={"center"}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              alignItems: "center",
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {props.pages.map((page) => (
              <Link
                key={page.label}
                to={page.location}
                style={{
                  margin: 20,
                  color: "white",
                  textDecoration:
                    location.pathname.indexOf(page.location) === -1
                      ? "none"
                      : "underline",
                }}
                onClick={() => setAnchorElNav(null)}
              >
                {page.label}
              </Link>
            ))}
          </Box>

          {props.username && (
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
              <Typography mr={2} variant={"h6"}>
                {props.username}
              </Typography>
              <Tooltip title={"Open settings"}>
                <IconButton
                  onClick={(event) => setAnchorElUser(event.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <AccountCircleIcon
                    fontSize={"large"}
                    sx={{ color: "white" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id={"menu-appbar"}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorElUser(null);
                    navigate(navigation.home);
                  }}
                >
                  <Typography textAlign={"center"}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
