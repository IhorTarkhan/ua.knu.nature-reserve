import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Logo } from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { nav } from "../constant/nav";
import { axios } from "../util/AxiosInterceptor";
import { api } from "../constant/api";
import { AxiosResponse } from "axios";

interface Props {
  pages: { label: string; location: string }[];
  home?: string;
  logout?: string;
}

export const Header = (props: Props): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    [
      { prefix: "/admin/", api: api.admin.authorisation.current },
      { prefix: "/manager/", api: api.manager.authorisation.current },
      { prefix: "/operator/", api: api.operator.authorisation.current },
    ].forEach((x) => {
      if (location.pathname.startsWith(x.prefix)) {
        axios
          .get(x.api)
          .then((r: AxiosResponse<{ username: string }>) =>
            setUsername(r.data.username)
          )
          .catch(alert);
      }
    });
  }, []);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  return (
    <AppBar position={"static"}>
      <Container maxWidth={"xl"}>
        <Toolbar disableGutters>
          <Box
            sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}
          >
            <Logo href={props.home} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size={"small"}
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
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    setAnchorElNav(null);
                    navigate(page.location);
                  }}
                >
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
            <Logo href={props.home} />
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
                <Typography variant={"h6"}>{page.label}</Typography>
              </Link>
            ))}
          </Box>

          {username && (
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
              <Typography mr={2} variant={"h6"}>
                {username}
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
                    navigate(props.logout || nav.home);
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
