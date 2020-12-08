import {
  Paper,
  List,
  Typography,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
} from "@material-ui/core";

import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { cartState } from "../../state";
import { moneyFormater } from "../../../components/ReuseableFunction";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const TotalAmount = (): JSX.Element => {
  const classes = useStyles();
  const [cart] = useRecoilState(cartState);
  const getTotal = () => {
    let total = 0;
    cart.product.forEach((item: any) => {
      total = item.product.price * item.quantity + total;
    });
    cart.combo.forEach((item: any) => {
      total = item.combo.originPrice * item.quantity + total;
    });
    return total;
  };
  const getDiscount = () => {
    let total = 0;
    cart.combo.forEach((item: any) => {
      total =
        (item.combo.originPrice - item.combo.price) * item.quantity + total;
    });
    return total;
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <List
        subheader={
          <Typography variant="h5" component="h4" color="inherit" gutterBottom>
            The total amount of
          </Typography>
        }
      >
        <Divider />
        <ListItem>
          <ListItemText>Temporary Amount</ListItemText>
          <ListItemSecondaryAction>
            {moneyFormater(getTotal())}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText>Discount</ListItemText>
          <ListItemSecondaryAction>
            -{moneyFormater(getDiscount())}
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText>Shipping</ListItemText>
          <ListItemSecondaryAction>Free</ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={<Typography variant="body2">Total</Typography>}
          ></ListItemText>
          <ListItemSecondaryAction>
            {moneyFormater(getTotal() - getDiscount())}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <Button variant="contained" size="large" fullWidth color="primary">
            Go to check out
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};
export default TotalAmount;
