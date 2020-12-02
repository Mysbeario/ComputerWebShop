import {
  FormGroup,
  FormControlLabel,
  Switch,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  createStyles,
  makeStyles,
  Theme,
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  Divider,
} from "@material-ui/core";

import { AccountCircle, ShoppingCartRounded, Face } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
  })
);

const CustomizeAppBar = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const [auth, setAuth] = React.useState(true);
  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = () => {
    setAuth(!auth);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={(): void => setDrawerOpenState(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          {auth ? (
            <div>
              <IconButton color="inherit">
                <ShoppingCartRounded onClick={() => history.push("./cart")} />
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
                id="menu-appbar"
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
                      <Typography variant="h6">Vu Nguyen </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        nguyenquocvu@gmail.com{" "}
                      </Typography>
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
                    Sign out
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
                  history.push("./login");
                }}
              >
                Login
              </Button>

              <Button
                style={{ textTransform: "none", fontWeight: "lighter" }}
                color="inherit"
                onClick={() => {
                  history.push("./register");
                }}
              >
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={drawerOpenState}
        onClose={(): void => setDrawerOpenState(false)}
      >
        test
      </Drawer>
    </div>
  );
};
export default CustomizeAppBar;
