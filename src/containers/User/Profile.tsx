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
  Dialog,
  DialogActions,
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
import ChangePassword from "./ChangePassword";

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

  const [accountOnState, setAccountOnState] = useRecoilState(accountState);
  const { register, errors, handleSubmit, setValue } = useForm<RegisterInfo>();
  const [isEditable, setIsEditable] = useState(false);
  const [openAlert, setOpenAlert] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const setDefaultValue = () => {
    setValue("name", accountOnState.name);
    setValue("phone", accountOnState.phone);
    setValue("email", accountOnState.email);
  };

  const handleUpdate = async (registerInfo: RegisterInfo): Promise<void> => {
    try {
      const customer = {
        id: accountOnState.id,
        name: registerInfo.name,
        email: accountOnState.email,
        phone: registerInfo.phone,
        address: registerInfo.address,
        password: registerInfo.password,
      };
      console.log(customer);
      await Axios.put("http://localhost:5000/api/customer", customer, options);

      setAccountOnState(customer);
      console.log("customerData:");

      setOpenAlert(1);
      setIsEditable(false);
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
      <AppBar />
      <Grid container direction="row" spacing={3}>
        <Grid item md={12} xs={12}></Grid>
        <Container component="main" maxWidth="xs" className={classes.p}>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={openAlert === 1}
            autoHideDuration={2000}
            onClose={() => setOpenAlert(0)}
            message="Profile has edited"
            key={"top" + "center"}
          />
          <Snackbar
            open={openAlert === 2}
            autoHideDuration={6000}
            onClose={() => setOpenAlert(0)}
          >
            <Alert severity="error">Fail</Alert>
          </Snackbar>
          <Paper className={classes.paper} elevation={7}>
            <Typography component="h1" variant="h5">
              My Profile
            </Typography>
            <form
              className={classes.form}
              onSubmit={handleSubmit(handleUpdate)}
            >
              <TextField
                variant={isEditable ? "outlined" : "standard"}
                margin="normal"
                required
                fullWidth
                defaultValue={accountOnState.name}
                name="name"
                label="Name"
                InputProps={{ readOnly: !isEditable }}
                type="text"
                inputRef={register({ required: true })}
                error={!!errors.name}
              />
              <TextField
                margin="normal"
                required
                variant={isEditable ? "outlined" : "standard"}
                fullWidth
                disabled
                defaultValue={accountOnState.email}
                name="email"
                label="Email"
                InputProps={{ readOnly: !isEditable }}
                type="text"
              />
              <TextField
                variant="outlined"
                margin="normal"
                variant={isEditable ? "outlined" : "standard"}
                required
                fullWidth
                name="address"
                defaultValue={accountOnState.address}
                label="Address"
                InputProps={{ readOnly: !isEditable }}
                type="text"
                inputRef={register({ required: true })}
                error={!!errors.address}
              />
              <TextField
                margin="normal"
                required
                variant={isEditable ? "outlined" : "standard"}
                InputProps={{ readOnly: !isEditable }}
                fullWidth
                name="phone"
                defaultValue={accountOnState.phone}
                label="Phone"
                type="text"
                inputRef={register({
                  required: true,
                  pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                })}
                error={!!errors.password}
              />
              {errors.password && (
                <Typography align="center" color="primary">
                  Please enter valid password address !
                </Typography>
              )}
              {errors.phone && (
                <Typography align="center" color="primary">
                  Please enter valid pohne number !
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
                  <Button
                    style={{ marginLeft: "9px" }}
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}
                    onClick={() => {
                      setIsEditable(false);
                      setDefaultValue();
                    }}
                  >
                    Cancel
                  </Button>
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
                  Edit Profile
                </Button>
              )}
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                fullWidth
              >
                Change password
              </Button>
            </form>
          </Paper>
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            onClose={() => handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <ChangePassword />
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Grid>
    </>
  );
};
export default Login;
