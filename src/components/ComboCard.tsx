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
  List,
  ListItem,
} from "@material-ui/core";
import {
  moneyFormater,
  addToCart,
  removeFromCart,
  dropItem,
  addComboToCart,
  removeComboFromCart,
  dropCombo,
} from "./ReuseableFunction";

import { useRecoilState } from "recoil";
import { cartState } from "../containers/state";
import { useHistory } from "react-router-dom";
import { CartState, Combo, Product } from "../interfaces";
import { number } from "prop-types";
import Carousel from "react-material-ui-carousel";
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

const ComboCart = (item: any): JSX.Element => {
  const classes = useStyles();
  const [cart, setCart] = useRecoilState(cartState);
  const history = useHistory();
  const theme = useTheme();

  const onIncrease = () => {
    const newCart: CartState = addComboToCart(cart, item.combo, 1);
    console.log(cart);
    setCart(newCart);
  };
  const onDecrease = () => {
    const newCart: CartState = removeComboFromCart(cart, item.combo, 1);
    setCart(newCart);
  };
  const onDrop = () => {
    const newCart: CartState = dropCombo(cart, item.combo);
    setCart(newCart);
  };
  return (
    <div className={classes.details}>
      <Box bgcolor="text.secondary">
        <Card className={classes.root} elevation={0}>
          <Carousel>
            {item.combo.details.map((item: any) => {
              return (
                <CardMedia
                  className={classes.cover}
                  src={
                    item.product.image
                      ? "http://localhost:5000/api/image/" + item.product.image
                      : ""
                  }
                  component="img"
                />
              );
            })}
          </Carousel>
          <div className={classes.details}>
            <CardContent>
              {/* <List>
            
              {item.combo.details.map((item: any) => {
                
                return (
                  <ListItem>
                    { ". "+ item.product.name}
                
                  </ListItem>
                )
              }
              </List> */}
              <Typography component="div" variant="h6">
                {item.combo.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="div"
              >
                {moneyFormater(item.combo.price)}
              </Typography>

              <ButtonGroup variant="outlined" disableElevation color="default">
                <Button onClick={() => onDecrease()}>-</Button>
                <Button>{item.amount}</Button>
                <Button onClick={(item: any) => onIncrease()}>+</Button>
              </ButtonGroup>
              <IconButton onClick={() => onDrop()}>
                <DeleteIcon color="action" />
              </IconButton>
            </CardContent>
          </div>
        </Card>
      </Box>
    </div>
  );
};
export default ComboCart;

// {each.details.map((item: any) => {
//   return (
//     <Box>
//       <Card className={classes.root} elevation={0}>
//         <CardMedia
//           className={classes.cover}
//           src={
//             item.combo.image
//               ? "http://localhost:5000/api/image/" +
//                 item.combo.image
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
//               {item.combo.name}
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               color="textSecondary"
//               component="div"
//             >
//               {moneyFormater(item.combo.price)}
//             </Typography>
//           </CardContent>
//         </div>
//       </Card>
//       <Divider />
//     </Box>
//   );
// })}
