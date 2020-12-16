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
import {
  AccountCircle,
  ShoppingCartRounded,
  Face,
  Search,
  SearchRounded,
} from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Axios from "axios";
import { useForm } from "react-hook-form";
import React from "react";
import "../../style/home.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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

    padding: theme.spacing(4),
  },
  flex: {
    display: "flex",
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
    paddingTop: theme.spacing(5),
  },
}));

interface RegisterInfo {
  oldPassword: string;
  newPassword: string;
}
const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const Login = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const [accountOnState, setAccountOnState] = useRecoilState(accountState);
  const { register, errors, handleSubmit, setValue } = useForm<RegisterInfo>();
  const [isEditable, setIsEditable] = useState(true);
  const [openAlert, setOpenAlert] = useState(0);

  const handleUpdate = async (registerInfo: RegisterInfo): Promise<void> => {
    try {
      const customterPassword = {
        oldPassword: registerInfo.oldPassword,
        newPassword: registerInfo.newPassword,
      };
      console.log(customterPassword);
      await Axios.put(
        "http://localhost:5000/api/customer/password",
        customterPassword,
        options
      );

      setOpenAlert(1);
    } catch (e) {
      setOpenAlert(2);
    }
  };

  useEffect(() => {
    if (
      !accountOnState.name &&
      !accountOnState.email &&
      !accountOnState.address &&
      !accountOnState.phone
    ) {
      history.push("/login");
    }
  }, [accountOnState]);

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.p}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openAlert === 1}
          autoHideDuration={2000}
          onClose={() => setOpenAlert(0)}
          message="Password has changed"
          key={"top" + "center"}
        />
        <Snackbar
          open={openAlert === 2}
          autoHideDuration={6000}
          onClose={() => setOpenAlert(0)}
        >
          <Alert severity="error">Fail</Alert>
        </Snackbar>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(handleUpdate)}>
            <TextField
              margin="normal"
              required
              variant={isEditable ? "outlined" : "standard"}
              InputProps={{ readOnly: !isEditable }}
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              inputRef={register({
                required: true,
              })}
            />
            <TextField
              margin="normal"
              required
              variant={isEditable ? "outlined" : "standard"}
              InputProps={{ readOnly: !isEditable }}
              fullWidth
              name="newPassword"
              label="New password"
              type="password"
              inputRef={register({
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

                required: true,
              })}
              error={!!errors.newPassword}
            />
            {errors.newPassword && (
              <Typography align="center" color="primary">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </Typography>
            )}

            {isEditable ? (
              <div className={classes.flex}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  className={classes.submit}
                  onClick={() => {
                    setIsEditable(true);
                  }}
                >
                  Update
                </Button>
                {/* <Button
                  style={{ marginLeft: "9px" }}
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submit}
                  onClick={() => {
                    setIsEditable(false);
                  }}
                >
                  Cancel
                </Button> */}
              </div>
            ) : (
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => {
                  setIsEditable(true);
                }}
              >
                Change Password
              </Button>
            )}
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </>
  );
};
export default Login;
