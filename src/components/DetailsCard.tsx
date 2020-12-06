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
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useRecoilState(cartState);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const theme = useTheme();

  const AddToCarthandle = () => {
    const newCart: any[] = addToCart(cart, product, quantity);
    setCart(newCart);
    setOpen(true);
  };

  const onBuyHandle = () => {
    const newCart: any[] = addToCart(cart, product, quantity);
    setCart(newCart);
    setOpen(true);
    history.push("/cart");
  };

  const onQuantityChange = (command: boolean): void => {
    if (quantity === 1 && command === false) {
    } else {
      command ? setQuantity(quantity + 1) : setQuantity(quantity - 1);
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        message="Item is added to your cart!"
        key={"top" + "center"}
      />
      <Card className={classes.root} elevation={0}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {moneyFormater(product.price)}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {product.description}
          </Typography>
          <Typography variant="h4" gutterBottom>
            <ButtonGroup
              color="default"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => onQuantityChange(false)}>-</Button>
              <Button>{quantity}</Button>
              <Button onClick={() => onQuantityChange(true)}>+</Button>
            </ButtonGroup>
          </Typography>
          <CardActions>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => onBuyHandle()}
            >
              Buy
            </Button>
            <Button
              size="large"
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => AddToCarthandle()}
            >
              Add to cart
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
