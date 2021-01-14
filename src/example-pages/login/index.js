import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(20),
    height: "550px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: "black"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(10)
  },
  submit: {
    margin: theme.spacing(9, 0, 2)
  },
  bigDiv: {
    backgroundImage:
      "url(https://burst.shopifycdn.com/photos/coding-on-laptop.jpg?width=1200&format=pjpg&exif=0&iptc=0)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    margin: "0",
    position: "absolute"
  },
  container: {
    // backgroundImage : "url(https://images2.alphacoders.com/774/thumb-1920-774372.jpg)",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px",
    opacity: "0.8"
  }
}));

export default function Login() {
  const [username, setName] = useState("");
  const [password, setPass] = useState("");
  const [newPasswordFlag, setNewPasswordFlag] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const takeMail = e => {
    setName(e.target.value);
  };
  const takePass = e => {
    setPass(e.target.value);
  };
  const takeNewPass = e => {
    setNewPass(e.target.value);
  };
  const token = localStorage.getItem("UserToken");
  if (token) {
    history.push("/HomePage");
  }

  const signIn = () => {
    axios
      .post(
        "http://localhost:3001/login",
        {
          email: username,
          password: password,
          newPassword: newPass
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(function(response) {
        localStorage.setItem("UserToken", response.data);
        history.push("/HomePage");
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.response.data);
        if (
          error.response.data["msg"] ===
          "Must enter a new password on your first login"
        ) {
          setNewPasswordFlag(true);
          setNewPass("");
        }
      });
  };
  return (
    <div className={classes.bigDiv}>
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={username}
              onChange={takeMail}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={takePass}
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="First login choose a new password"
              type="password"
              value={newPass}
              onChange={takeNewPass}
              id="Newpassword"
              autoComplete="current-password"
              style={{ display: newPasswordFlag ? "block" : "none" }}
            />
            {/* <Link to={signIn} className="app-logo-link"> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={signIn}
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* </Link> */}
          </form>
        </div>
      </Container>
    </div>
  );
}
