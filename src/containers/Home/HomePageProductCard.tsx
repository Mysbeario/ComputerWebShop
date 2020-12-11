import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { cartState } from "../../containers/state";
import { addToCart } from "../../components/ReuseableFunction";
import { useRecoilState } from "recoil";
import { any } from "prop-types";
import { Product } from "../../interfaces";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      paddingLeft: theme.spacing(4),
    },
    pt: {
      paddingTop: theme.spacing(8),
    },
    paper: {
      padding: theme.spacing(2),
    },
    card: {
      minHeight: "400px",
    },
  })
);
const formatString = (number: any): any => {
  var formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(number);
};

const HomePageProductCard = (props: Product): JSX.Element => {
  const [cart, setCart] = useRecoilState(cartState);
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = useState(false);

  const handleAddButton = (item: Product) => {
    const newCart = addToCart(cart, item, 1);
    setCart(newCart);
    setOpen(true);
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
      <Paper elevation={2}>
        <Card>
          <CardActionArea
            onClick={() => {
              history.push("product/" + props.id);
            }}
          >
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="240"
              width="150"
              src={"http://localhost:5000/api/image/" + props.image}
              title="None"
            />
            <CardContent style={{ height: 130, textAlign: "center" }}>
              <Box
                component="div"
                textOverflow="ellipsis"
                overflow="hidden"
                height="70"
                fontWeight="fontWeightBold"
                fontSize="body1.fontSize"
              >
                {props.name}
              </Box>

              <Box>
                <Typography
                  variant="body1"
                  component="h6"
                  align="center"
                  style={{ fontWeight: 600, color: "red" }}
                >
                  {formatString(props.price)}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="medium"
              variant="contained"
              fullWidth
              style={{ fontWeight: 700 }}
              color="secondary"
              onClick={() => handleAddButton(props)}
              startIcon={<AddShoppingCartIcon />}
            >
              Add
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
};
export default HomePageProductCard;
