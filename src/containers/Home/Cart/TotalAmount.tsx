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
import { useHistory } from "react-router-dom";
import {
  getDiscount,
  getTotal,
  moneyFormater,
} from "../../../components/ReuseableFunction";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const TotalAmount = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const [cart] = useRecoilState(cartState);

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
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              history.push("/checkout");
            }}
            fullWidth
            disabled={
              cart.product.length === 0 && cart.combo.length === 0
                ? true
                : false
            }
            color="primary"
          >
            Go to check out
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};
export default TotalAmount;
