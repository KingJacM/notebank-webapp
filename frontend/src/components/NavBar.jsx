import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Login from "./Login";

export default function NavBar() {
  const theme = useTheme();
  let navigate = useNavigate();
  const { auth } = useAuth();
  const [value, setValue] = useState(0);

  const pages = ["Home", "Temp Link", "Temp Link", "Upload Notes"];

  return (
    <AppBar
      sx={{ background: theme.palette.greywhite.main, p: 2 }}
      position="static"
    >
      <Toolbar>
        <Typography
          component="span"
          display="flex"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setValue(0);
            navigate("/");
          }}
        >
          <Typography
            sx={{
              p: 1,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              bgcolor: theme.palette.primary.main,
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            Note
          </Typography>
          <Typography
            sx={{
              p: 1,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              fontSize: 20,
              bgcolor: theme.palette.secondary.main,
              fontWeight: 900,
            }}
          >
            Bank
          </Typography>
        </Typography>
        <Tabs
          sx={{
            color: theme.palette.textcolor.main,
            marginLeft: "auto",
          }}
          value={value}
          onChange={(e, value) => {
            setValue(value);
          }}
        >
          {pages.map((name, index) => {
            return (
              <Tab
                value={index}
                label={name}
                onClick={() => {
                  navigate(
                    name == "Home" ? "/" : "/" + name.replace(/\s/g, "")
                  );
                }}
              />
            );
          })}
        </Tabs>

        {auth.accessToken ? (
          <i
            className="fa-regular fa-circle-user"
            onClick={() => navigate("/profile")}
          ></i>
        ) : (
          <Login />
        )}
      </Toolbar>
    </AppBar>
  );
}
