import {
  makeStyles,
  Button,
  Card,
  Typography,
  ButtonGroup,
  IconButton,
  CardActions,
  CardContent,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  CardActionArea,
  Snackbar,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../containers/state";
import { useHistory } from "react-router-dom";
import { addToCart, moneyFormater } from "./ReuseableFunction";
import { CartState } from "../interfaces";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginTop: 24,
    marginBottom: 24,
  },
});

const DetailsCard = ({ product }: any): JSX.Element => {
  const classes = useStyles();
  const [amount, setQuantity] = useState<number>(1);
  const [cart, setCart] = useRecoilState(cartState);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const theme = useTheme();
  const [message, setMessage] = useState("");
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

  const AddToCarthandle = () => {
    const newCart: CartState = addToCart(cart, product, amount);
    const oldCartLength = getCartLength(cart);
    const newCartLength = getCartLength(newCart);
    if (oldCartLength === newCartLength) {
      setMessage("Product is out of stock");
    } else {
      setMessage("Product is added to your cart");
    }
    setCart(newCart);
    setOpen(true);
  };

  const onBuyHandle = () => {
    const newCart: CartState = addToCart(cart, product, amount);
    setCart(newCart);
    setOpen(true);
    history.push("/cart");
  };

  const onQuantityChange = (command: boolean): void => {
    if (amount === 1 && command === false) {
    } else {
      command ? setQuantity(amount + 1) : setQuantity(amount - 1);
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        message={message}
        key={"top" + "center"}
      />
      <Card className={classes.root} elevation={0}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {moneyFormater(product.price)}
          </Typography>
          <Typography
            color={product.amount === 0 ? "primary" : "textSecondary"}
            variant="body1"
            gutterBottom
          >
            {product.amount === 0
              ? "Out of stock"
              : "Remain: " + product.amount}
          </Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h4" gutterBottom>
            {/* <ButtonGroup
              color="default"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => onQuantityChange(false)}>-</Button>
              <Button>{amount}</Button>
              <Button onClick={() => onQuantityChange(true)}>+</Button>
            </ButtonGroup> */}
          </Typography>
          <CardActions>
            <Button
              size="large"
              disabled={product.amount === 0 ? true : false}
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => onBuyHandle()}
            >
              Buy
            </Button>
            <Button
              size="large"
              disabled={product.amount === 0 ? true : false}
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => AddToCarthandle()}
            >
              {product.amount === 0 ? "Out of stock" : "Add to cart"}
            </Button>
          </CardActions>
          <Typography variant="h5"></Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default DetailsCard;
