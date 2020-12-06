import React from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import { ButtonGroup, Button, CardActions, Divider } from "@material-ui/core";
import {
  moneyFormater,
  addToCart,
  removeFromCart,
  dropItem,
} from "./ReuseableFunction";
import { useRecoilState } from "recoil";
import { cartState } from "../containers/state";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 200,
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
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

const ProductCard = (item: any): JSX.Element => {
  const classes = useStyles();
  const [cart, setCart] = useRecoilState(cartState);
  const theme = useTheme();

  const onIncrease = () => {
    const newCart: any[] = addToCart(cart, item.product, 1);
    setCart(newCart);
  };
  const onDecrease = () => {
    const newCart: any[] = removeFromCart(cart, item.product);
    setCart(newCart);
  };
  const onDrop = () => {
    const newCart: any[] = dropItem(cart, item.product);
    setCart(newCart);
  };
  return (
    <div className={classes.details}>
      <Card className={classes.root} elevation={0}>
        <CardMedia
          className={classes.cover}
          src={"http://localhost:5000/api/image/" + item.product.image}
          title="Live from space album cover"
          component="img"
          height="200"
          alt="Contemplative Reptile"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6" gutterBottom>
              {item.product.name}
            </Typography>
            <Typography component="h6" variant="h6" gutterBottom>
              {moneyFormater(item.product.price)}
            </Typography>
            {console.log(item)}
            <ButtonGroup variant="outlined" disableElevation color="default">
              <Button onClick={() => onDecrease()}>-</Button>
              <Button>{item.quantity}</Button>
              <Button onClick={() => onIncrease()}>+</Button>
            </ButtonGroup>
          </CardContent>
          <CardActions>
            <IconButton>
              <DeleteIcon color="action" onClick={() => onDrop()} />
            </IconButton>
          </CardActions>
        </div>
        <Divider />
      </Card>
    </div>
  );
};
export default ProductCard;
