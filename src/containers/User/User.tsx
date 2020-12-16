import {
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Appbar from "../../components/AppBar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import MyOrder from "./MyOrder";
import OnCartList from "../Home/Cart/OnCartList";
import MyProfile from "./Profile";
import TotalAmount from "../Home/Cart/TotalAmount";

import { cartState, accountState } from "../state";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      paddingLeft: theme.spacing(4),
    },
    pt: {
      paddingTop: theme.spacing(8),
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const Cart = (): JSX.Element => {
  const classes = useStyles();
  const account = useRecoilValue(accountState);
  const [cart] = useRecoilState(cartState);
  const history = useHistory();
  // useEffect(() => {
  //   if (!account.name && !account.email && !account.address && !account.phone) {
  //     history.push("/login");
  //   }
  // }, [account]);

  return (
    <div>
      <Appbar />
      <Container className={classes.pt}>
        <Grid container direction="row" spacing={3}>
          <Grid item md={12} xs={12} className={classes.grid}>
            <MyOrder />
          </Grid>
          <Grid item md={4} xs={12} className={classes.grid}>
            {/* <MyProfile /> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Cart;
