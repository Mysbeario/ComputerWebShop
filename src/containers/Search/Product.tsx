import React, { useState } from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CartIcon from "@material-ui/icons/ShoppingCart";
import {
  ButtonGroup,
  Button,
  CardActions,
  Divider,
  CardActionArea,
  Snackbar,
} from "@material-ui/core";
import {
  moneyFormater,
  addToCart,
  removeFromCart,
  dropItem,
} from "../../components/ReuseableFunction";
import { useRecoilState } from "recoil";
import { cartState } from "../../containers/state";
import { useHistory } from "react-router-dom";
import { CartState } from "../../interfaces";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: theme.spacing(4),
    },
    details: {
      flexDirection: "column",
      margin: theme.spacing(2),
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    float: {
      float: "right",
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);

const Product = (item: any): JSX.Element => {
  const classes = useStyles();
  const [cart, setCart] = useRecoilState(cartState);
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const AddToCarthandle = (product: any) => {
    const newCart: CartState = addToCart(cart, product, 1);
    setCart(newCart);
    setOpen(true);
  };

  return (
    <div className={classes.details}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        message="Item is added to your cart!"
        key={"top" + "center"}
      />
      <Card className={classes.root} elevation={2}>
        <CardMedia
          className={classes.cover}
          src={"http://localhost:5000/api/image/" + item.image}
          title="Live from space album cover"
          onClick={() => {
            history.push("/product/" + item.id);
          }}
          component="img"
        />
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h4">
            {item.name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {moneyFormater(item.price)}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => AddToCarthandle(item)}
          >
            Add to cart
          </Button>

          <IconButton aria-label="next"></IconButton>
        </div>
      </Card>
    </div>
  );
};
export default Product;
