import {
  FormGroup,
  FormControlLabel,
  Switch,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  createStyles,
  makeStyles,
  Theme,
  Button,
  ButtonGroup,
  Grid,
  Divider,
  InputBase,
  fade,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";

import {
  AccountCircle,
  ShoppingCartRounded,
  Face,
  Search,
  Receipt,
  SearchRounded,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { accountState, cartState, searchState } from "../containers/state";
import CustomizeDrawer from "./CustomizeDrawer";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(5),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    padding: {
      padding: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    menu: {
      minWidth: 300,
    },
    alignCenter: {
      justifyContent: "center",
      padding: theme.spacing(2),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

const getCartLength = (cart: any) => {
  let length = 0;
  cart.product.map((item: any) => {
    length = item.amount + length;
  });
  cart.combo.map((item: any) => {
    length = item.amount + length;
  });
  return length;
};

const CustomizeAppBar = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const account = useRecoilValue(accountState);
  const [auth, setAuth] = React.useState(false);
  const setAccountState = useSetRecoilState(accountState);
  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signOut, setSignOut] = useState<string>("Sign out");
  const [cart] = useRecoilState(cartState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const setSearchState = useSetRecoilState(searchState);
  const setCart = useSetRecoilState(cartState);
  const open = Boolean(anchorEl);
  const cookies = new Cookies();

  useEffect(() => {
    if (account.name && account.email && account.address && account.phone) {
      setAuth(true);
    }
  }, [account]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const defaultAccountState = {
    name: "",
    email: "",
    address: "",
    id: -1,
    password: "",
    phone: "",
  };
  const handleChange = () => {
    setIsLoading(true);
    setSignOut("...");
    setTimeout(() => {
      setIsLoading(false);
      cookies.remove("UserId", {
        path: "/",
        domain: "localhost",
      });

      setAuth(!auth);
      setAccountState(defaultAccountState);
      setCart({
        product: [],
        combo: [],
      });
    }, 1500);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleKeyPress = (event: any): void => {
    if (event.key === "Enter") {
      setSearchState({ key: "search", value: event.target.value });
      console.log(event.target.value);
      history.push({
        pathname: "/search",
      });
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={6} color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={(): void => setDrawerOpenState(true)}
          >
            <MenuIcon />
          </IconButton>
          <Button
            variant="text"
            onClick={() => {
              history.push("/");
            }}
          >
            <img
              src="https://www.upsieutoc.com/images/2020/12/04/gamehub.png"
              height="35px"
            />
          </Button>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={(e) => handleKeyPress(e)}
              inputProps={{ "aria-label": "search" }}
            /> 
          </div> */}

          <Typography variant="h6" className={classes.title}></Typography>
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  history.push("/user");
                }}
                color="inherit"
              >
                <Receipt />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem className={classes.padding}>
                  <Grid
                    className={classes.menu}
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item xs={12}>
                      <Face fontSize="large" />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6"> {account.name} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">{account.email}</Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
                <Divider />
                <MenuItem className={classes.alignCenter}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleChange}
                    color="default"
                  >
                    {signOut}
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      history.push("/profile");
                    }}
                    color="primary"
                  >
                    My Profile
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "black",
                }}
                color="inherit"
                variant="contained"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>

              <Button
                style={{ textTransform: "none", fontWeight: "lighter" }}
                color="inherit"
                onClick={() => {
                  history.push("/register");
                }}
              >
                Register
              </Button>
            </div>
          )}

          <IconButton onClick={() => history.push("/search")} color="inherit">
            <Badge color="error">
              <Search />
            </Badge>
          </IconButton>
          <IconButton onClick={() => history.push("/cart")} color="inherit">
            <Badge badgeContent={getCartLength(cart)} color="error">
              <ShoppingCartRounded />
            </Badge>
          </IconButton>
        </Toolbar>
        {isLoading ? <LinearProgress color="primary" /> : <></>}
      </AppBar>
      <CustomizeDrawer
        drawerOpenState={drawerOpenState}
        setDrawerOpenState={(): void => {
          setDrawerOpenState(false);
        }}
      />
    </div>
  );
};
export default CustomizeAppBar;
