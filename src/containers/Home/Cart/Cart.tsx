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
import OnCartList from "./OnCartList";
import AppBar from "../../../components/AppBar";
import TotalAmount from "./TotalAmount";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, accountState } from "../../state";
import { useHistory } from "react-router-dom";
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
  const [cart] = useRecoilState(cartState);
  const history = useHistory();
  const account = useRecoilValue(accountState);

  // useEffect(() => {
  //   if (!account.name && !account.email && !account.address && !account.phone) {
  //     history.push("/login");
  //   }
  // }, [account]);
  return (
    <div>
      <AppBar />
      <Container className={classes.pt}>
        <Grid container direction="row" spacing={3}>
          <Grid item md={8} xs={12} className={classes.grid}>
            <OnCartList cart={cart} />
          </Grid>
          <Grid item md={4} xs={12} className={classes.grid}>
            <TotalAmount />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Cart;
