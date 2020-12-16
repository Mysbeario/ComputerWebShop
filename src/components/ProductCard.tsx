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
import {
  ButtonGroup,
  Button,
  CardActions,
  Divider,
  CardActionArea,
  Box,
} from "@material-ui/core";
import {
  moneyFormater,
  addToCart,
  removeFromCart,
  dropItem,
} from "./ReuseableFunction";
import { useRecoilState } from "recoil";
import { cartState } from "../containers/state";
import { useHistory } from "react-router-dom";
import { CartState } from "../interfaces";
import { number } from "prop-types";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
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
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

const ProductCard = (item: any): JSX.Element => {
  const classes = useStyles();
  const [cart, setCart] = useRecoilState(cartState);
  const history = useHistory();
  const theme = useTheme();

  const onIncrease = (item: any) => {
    if (item.amount < item.product.amount) {
      const newCart: CartState = addToCart(cart, item.product, 1);
      setCart(newCart);
    }
  };
  const onDecrease = (item: any) => {
    const newCart: CartState = removeFromCart(cart, item.product);
    setCart(newCart);
  };
  const onDrop = () => {
    const newCart: CartState = dropItem(cart, item.product);
    setCart(newCart);
  };
  return (
    <div className={classes.details}>
      <Box>
        <Card className={classes.root} elevation={0}>
          <CardMedia
            className={classes.cover}
            src={
              item.product.image
                ? "http://localhost:5000/api/image/" + item.product.image
                : ""
            }
            component="img"
          />
          <div className={classes.details}>
            <CardContent>
              <Typography component="div" variant="h6">
                {item.product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="div"
              >
                Remain: {item.product.amount}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="div"
              >
                {moneyFormater(item.product.price)}
              </Typography>
              <ButtonGroup variant="outlined" disableElevation color="default">
                <Button onClick={() => onDecrease(item)}>-</Button>
                <Button>{item.amount}</Button>
                <Button onClick={() => onIncrease(item)}>+</Button>
              </ButtonGroup>
              <IconButton onClick={() => onDrop()}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </div>
        </Card>
        <Divider />
      </Box>
    </div>
  );
};
export default ProductCard;

// {each.details.map((item: any) => {
//   return (
//     <Box>
//       <Card className={classes.root} elevation={0}>
//         <CardMedia
//           className={classes.cover}
//           src={
//             item.product.image
//               ? "http://localhost:5000/api/image/" +
//                 item.product.image
//               : ""
//           }
//           component="img"
//         />
//         <div className={classes.details}>
//           <CardContent>
//             <Typography component="div" variant="h6">
//               {"#" + number++ + ". "}
//             </Typography>
//             <Typography component="div" variant="h6">
//               {item.product.name}
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               color="textSecondary"
//               component="div"
//             >
//               {moneyFormater(item.product.price)}
//             </Typography>
//           </CardContent>
//         </div>
//       </Card>
//       <Divider />
//     </Box>
//   );
// })}
