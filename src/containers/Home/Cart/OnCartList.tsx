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
import ProductCard from "../../../components/ProductCard";

import ComboCard from "../../../components/ComboCard";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const OnCartList = ({ cart }: any): JSX.Element => {
  const classes = useStyles();
  console.log("cart ne");
  console.log(cart.product.length);
  console.log(cart.combo.length);
  return cart.product.length == 0 && cart.combo.length == 0 ? (
    <>
      {" "}
      <Typography
        align="center"
        variant="h5"
        component="h4"
        color="inherit"
        gutterBottom
      >
        Cart is empty
      </Typography>
    </>
  ) : (
    <Paper elevation={3} className={classes.paper}>
      <List
        subheader={
          <Typography variant="h5" component="h4" color="inherit" gutterBottom>
            Cart items
          </Typography>
        }
      >
        <Divider />
        <ListItem>
          {console.log(cart)}
          {cart.combo.length != 0 ? (
            <Typography
              variant="h6"
              component="h4"
              color="inherit"
              gutterBottom
            >
              Combo
            </Typography>
          ) : (
            <></>
          )}
        </ListItem>

        {cart.combo.map((combo: any) => (
          <ListItem key={combo.combo.id}>
            <ComboCard {...combo} />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          {console.log(cart)}
          {cart.product.length != 0 ? (
            <Typography
              variant="h6"
              component="h4"
              color="inherit"
              gutterBottom
            >
              Products
            </Typography>
          ) : (
            <></>
          )}
        </ListItem>

        {cart.product.map((item: any) => (
          <ListItem key={item.id}>
            <ProductCard {...item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
export default OnCartList;
