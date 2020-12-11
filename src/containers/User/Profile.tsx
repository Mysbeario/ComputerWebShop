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

    padding: theme.spacing(4),
  },
  flex:
  {
      display: "flex"
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
  p: {},
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
  const { register, errors, handleSubmit,setValue } = useForm<RegisterInfo>();
  const setAccountState = useSetRecoilState(accountState);
  const [isEditable, setIsEditable] = useState(false);
  const [openAlert, setOpenAlert] = useState(0);

  const setDefaultValue=()=>
{
    setValue("name",account.name);
    setValue( "phone", account.phone);
    setValue( "email", account.email);
}

  const handleUpdate = async (registerInfo: RegisterInfo): Promise<void> => {
    try {
      const id = await Axios.put(
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

  return (
    <>
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
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(handleUpdate)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue={account.name}
              name="name"
              label="Name"
              InputProps={{ readOnly: !isEditable }}
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
              defaultValue={account.address}
              label="Address"
              InputProps={{ readOnly: !isEditable }}
              type="text"
              inputRef={register({ required: true })}
              error={!!errors.address}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              InputProps={{ readOnly: !isEditable }}
              fullWidth
              name="phone"
              defaultValue={account.phone}
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
          </form>
        </Paper>
        <Box mt={8}></Box>
      </Container>
    </>
  );
};
export default Login;
