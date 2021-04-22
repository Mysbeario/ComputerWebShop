import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartState, shippingInfoState } from "../state";
import {
  moneyFormater,
} from "../../components/ReuseableFunction";

import {
  Avatar,
  Divider,
  ListItemAvatar,
} from "@material-ui/core";

const getComboDiscount = (receipt: any) => {
  let quantity = 0;
  let totalOriginalCost = 0;
  let price = 0;
  receipt.combos.map((combo: any) => {
    quantity += combo.amount;
    totalOriginalCost += combo.combo.originPrice;
    price += combo.combo.price;
  });

  return quantity * (totalOriginalCost - price);
};


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

const OrderReview = (receipt: any) => {
  const classes = useStyles();
  const history = useHistory();
  const [cart] = useRecoilState(cartState);
  const [shippingInfo] = useRecoilState(shippingInfoState);

  return (
    <React.Fragment>
      {receipt.combos.length !== 0 ? (
        <div>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold" }}
            gutterBottom
            className={classes.title}
          >
            Combo
          </Typography>
          <Divider />
        </div>
      ) : (
        <></>
      )}
      <List disablePadding></List>
      {receipt.combos.map((comboInCart: any) => (
        <ListItem className={classes.listItem} key={comboInCart.combo.id}>
          <ListItemText
            primary={comboInCart.combo.name}
            secondary={"Amount: " + comboInCart.amount}
          />
          <Typography style={{ fontWeight: "bold" }} variant="body2">
            {moneyFormater(comboInCart.combo.price)}
          </Typography>
        </ListItem>
      ))}
      {receipt.details.length != 0 ? (
        <div>
          {" "}
          <Typography
            variant="h6"
            style={{ fontWeight: "bold" }}
            gutterBottom
            className={classes.title}
          >
            Product
          </Typography>
          <Divider />
        </div>
      ) : (
        <></>
      )}

      <List disablePadding>
        {receipt.details.map((productInCart: any) => (
          <ListItem
            button
            onClick={() => {
              history.push("/product/" + productInCart.product.id);
            }}
            className={classes.listItem}
            key={productInCart.product.id}
          >
            <ListItemAvatar>
              <Avatar
                variant="square"
                alt="Remy Sharp"
                src={
                  productInCart.product.image
                    ? "http://localhost:5000/api/image/" +
                      productInCart.product.image
                    : ""
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={productInCart.product.name}
              secondary={"Amount: " + productInCart.amount}
            />
            <Typography variant="body2">
              {moneyFormater(productInCart.product.price)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Discount" />
          <Typography variant="subtitle1" className={classes.total}>
            -{moneyFormater(getComboDiscount(receipt))}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {moneyFormater(receipt.totalCost)}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {" "}
          <Divider />
          <Typography
            variant="h6"
            style={{ fontWeight: "bold" }}
            gutterBottom
            className={classes.title}
          >
            Shipping details
          </Typography>
          <Typography gutterBottom>{receipt.customer.name}</Typography>
          <Typography gutterBottom>{receipt.customer.address}</Typography>
          <Typography gutterBottom>{receipt.customer.phone}</Typography>
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
export default OrderReview;
