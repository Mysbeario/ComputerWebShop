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
  })
);
const formatString = (number: any): any => {
  var formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(number);
};

interface Props {
  name: string;
  price: number;
  image: string;
  amount: number;
  id: number;
  description: string;
}

const HomePageProductCard = (props: Props): JSX.Element => {
  const [cart, setCart] = useRecoilState(cartState);
  let history = useHistory();
  const [open, setOpen] = useState(false);

  const handleAddButton = (item: Props) => {
    const newCart: any[] = addToCart(cart, item, 1);
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
              height="150"
              width="150"
              src={"http://localhost:5000/api/image/" + props.image}
              title="None"
            />
            <CardContent>
              <Typography
                variant="body1"
                style={{ fontWeight: 500 }}
                align="center"
                component="h6"
              >
                {props.name}
              </Typography>
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
