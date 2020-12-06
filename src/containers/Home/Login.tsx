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
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import React from "react";
import "../../style/home.css";
import { accountState } from "../state";
import AppBar from "../../components/AppBar";
import { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";

interface LoginInfo {
  email: string;
  password: string;
}

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
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(5),
  },
}));

const Login = (): JSX.Element => {
  const classes = useStyles();
  const account = useRecoilValue(accountState);
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm<LoginInfo>();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const setAccountState = useSetRecoilState(accountState);
  useEffect(() => {
    if (account.name && account.email && account.address && account.phone) {
      history.push("/");
    }
  }, [account]);
  const handleLogin = async (loginInfo: LoginInfo): Promise<void> => {
    try {
      const loginRespone = await Axios.post(
        "http://localhost:5000/api/login/customer",
        loginInfo,
        { withCredentials: true }
      );
      setAccountState(loginRespone.data);
      console.log(loginRespone.data);
    } catch (e) {
      setOpen(true);
    }
  };

  return (
    <>
      <AppBar />
      <Container component="main" maxWidth="xs" className={classes.p}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="The password or email that you've entered is incorrect !"
          key={"top" + "center"}
        />

        <Paper className={classes.paper} elevation={7}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              inputRef={register({ required: true })}
              error={!!errors.email}
            />
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
              inputRef={register({ required: true })}
              error={!!errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box mt={8}></Box>
      </Container>
    </>
  );
};
export default Login;
