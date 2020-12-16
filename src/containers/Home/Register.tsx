import {
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  Box,
  Paper,
  Snackbar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Axios from "axios";
import { useForm } from "react-hook-form";
import React from "react";
import "../../style/home.css";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accountState } from "../state";
import AppBar from "../../components/AppBar";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert/Alert";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  p: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

interface RegisterInfo {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
}
const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

const Login = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const account = useRecoilValue(accountState);
  const { register, errors, handleSubmit } = useForm<RegisterInfo>();
  const setAccountState = useSetRecoilState(accountState);
  const [openAlert, setOpenAlert] = useState(0);
  const handleLogin = async (registerInfo: RegisterInfo): Promise<void> => {
    try {
      console.log(registerInfo);
      const id = await Axios.post(
        "http://localhost:5000/api/customer",
        registerInfo,
        options
      );
      const customer = {
        id: id.data,
        name: registerInfo.name,
        email: registerInfo.email,
        phone: registerInfo.phone,
        address: registerInfo.address,
        password: registerInfo.password,
      };
      setAccountState(customer);
      console.log("customerData:");
      console.log(customer);
      if (account.name && account.email && account.address && account.phone) {
        history.push("/");
      }
      setOpenAlert(2);
    } catch (e) {
      setOpenAlert(1);
    }
  };
  useEffect(() => {
    if (account.name && account.email && account.address && account.phone) {
      history.push("/");
    }
  }, [account]);
  return (
    <>
      <AppBar />
      <Container component="main" maxWidth="xs" className={classes.p}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openAlert === 1}
          autoHideDuration={2000}
          onClose={() => setOpenAlert(0)}
          message="Register failed! Email has been used"
          key={"top" + "center"}
        />
        <Snackbar
          open={openAlert === 2}
          autoHideDuration={6000}
          onClose={() => setOpenAlert(0)}
        >
          <Alert severity="error">
            Account created! You can login to your account now!
          </Alert>
        </Snackbar>
        <Paper className={classes.paper} elevation={7}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={register({
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                required: true,
              })}
              error={!!errors.email}
            />
            {errors.email && (
              <Typography align="center" color="primary">
                Please enter valid email address !
              </Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

                required: true,
              })}
              error={!!errors.password}
            />
            {errors.password && (
              <Typography align="center" color="primary">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              inputRef={register({ required: true })}
              error={!!errors.name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              inputRef={register({ required: true })}
              error={!!errors.address}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="text"
              inputRef={register({
                required: true,
                pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
              })}
              error={!!errors.password}
            />
            {errors.phone && (
              <Typography align="center" color="primary">
                Please enter valid pohne number !
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </Paper>
        <Box mt={8}></Box>
      </Container>
    </>
  );
};
export default Login;
