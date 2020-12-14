import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { useRecoilState } from "recoil";
import { cartState, shippingInfoState } from "../state";
import {
  getDiscount,
  getTotal,
  moneyFormater,
} from "../../components/ReuseableFunction";
import { Divider } from "@material-ui/core";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review = () => {
  const classes = useStyles();
  const [cart] = useRecoilState(cartState);
  const [shippingInfo] = useRecoilState(shippingInfoState);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Typography variant="body1" gutterBottom>
        Combo
      </Typography>
      <Divider />
      <List disablePadding></List>
      {cart.combo.map((comboInCart) => (
        <ListItem className={classes.listItem} key={comboInCart.combo.id}>
          <ListItemText
            primary={comboInCart.combo.name}
            secondary={"Amount: " + comboInCart.quantity}
          />
          <Typography variant="body2">
            {moneyFormater(comboInCart.combo.price)}
          </Typography>
        </ListItem>
      ))}
      {cart.product.length !== 0 ? (
        <Typography variant="body1" gutterBottom>
          Product
        </Typography>
      ) : (
        <></>
      )}
      <Divider />
      <List disablePadding>
        {cart.product.map((productInCart) => (
          <ListItem className={classes.listItem} key={productInCart.product.id}>
            <ListItemText
              primary={productInCart.product.name}
              secondary={"Amount: " + productInCart.quantity}
            />
            <Typography variant="body2">
              {moneyFormater(productInCart.product.price)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Discount" />
          <Typography variant="subtitle1" className={classes.total}>
            -{moneyFormater(getDiscount())}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {moneyFormater(getTotal() - getDiscount())}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {cart.combo.length !== 0 ? (
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
          ) : (
            <></>
          )}
          <Typography gutterBottom>{shippingInfo.name}</Typography>
          <Typography gutterBottom>{shippingInfo.address}</Typography>
          <Typography gutterBottom>{shippingInfo.phone}</Typography>
        </Grid>
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};
export default Review;
