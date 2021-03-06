import {
  Paper,
  List,
  Typography,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Chip,
  CardMedia,
  CardActions,
  Snackbar,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useParams } from "react-router-dom";
import ProductCard from "../Search/Product";

import { CartState, Combo, Product } from "../../interfaces";
import AddShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  addComboToCart,
  moneyFormater,
} from "../../components/ReuseableFunction";
import { useRecoilState, useSetRecoilState } from "recoil";

import { cartState } from "../state";
import { Avatar } from "@material-ui/core";

const initValue = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  amount: 0,
  category: {
    id: 0,
    name: "",
  },
  image: "",
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4),
      margin: theme.spacing(2),
    },
    root: {
      display: "flex",
    },
    cover: {
      width: 151,
      padding: theme.spacing(4),
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    alignRight: {
      justifyContent: "right",
      padding: theme.spacing(2),
    },
  })
);

const RelateCombo = ({ productId }: { productId: string }): JSX.Element => {
  const classes = useStyles();
  const url = "http://localhost:5000/api/combo/?contain=" + productId;
  const [combo, setCombo] = useState([]);
  const [open, setOpen] = useState(false);

  const [cart, setCart] = useRecoilState(cartState);

  const getProductCombo = async (): Promise<void> => {
    setTimeout(async () => {
      const { data } = await Axios.get(url);
      setCombo(data);
    }, 1000);
  };

  useEffect(() => {
    getProductCombo().catch((e) => {
      getProductCombo();
    });
  }, [combo]);

  const handleAddButton = (cart: CartState, combo: Combo, amount: number) => {
    const newCart = addComboToCart(cart, combo, amount);
    setCart(newCart);
    setOpen(true);
  };
  return combo.length != 0 ? (
    <Paper elevation={0} className={classes.paper}>
      <List
        subheader={
          <Typography variant="h5" component="h4" gutterBottom>
            Related Combo
          </Typography>
        }
      >
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={1000}
          onClose={() => setOpen(false)}
          message="Item is added to your cart!"
          key={"top" + "center"}
        />
        <Divider />

        {combo.map((each: any) => {
          let number = 1;
          return (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div>
                  <Typography
                    align="right"
                    style={{ fontWeight: "bolder" }}
                    variant="h6"
                  >
                    {"   "}
                    {each.name}
                    <Chip
                      style={{ margin: "5px" }}
                      label={each.discount + "% Discount"}
                      color="primary"
                      variant="outlined"
                    />
                  </Typography>
                  <Typography
                    style={{ textDecoration: "line-through", color: "red" }}
                  >
                    {moneyFormater(each.originPrice)}
                  </Typography>
                  <Typography style={{ fontWeight: 700 }}>
                    {moneyFormater(each.price)}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ display: "block", width: "100%" }}>
                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  gutterBottom
                  style={{ margin: "8px,12px" }}
                  onClick={() => handleAddButton(cart, each, 1)}
                  startIcon={<AddShoppingCartIcon />}
                >
                  Add Combo
                </Button>
                <Typography
                  variant="body2"
                  style={{ fontWeight: "bolder" }}
                  component="h6"
                  gutterBottom
                ></Typography>
                {each.details.map((item: any) => {
                  return (
                    <Box border borderColor="textSecondary">
                      <Card className={classes.root} elevation={0}>
                        <CardMedia
                          className={classes.cover}
                          src={
                            item.product.image
                              ? "http://localhost:5000/api/image/" +
                                item.product.image
                              : ""
                          }
                          component="img"
                        />

                        <div className={classes.details}>
                          <CardContent>
                            <Typography
                              component="div"
                              style={{ fontWeight: "bolder" }}
                              variant="body2"
                            >
                              {"#" + number++ + ". "}
                            </Typography>
                            <Typography
                              component="div"
                              style={{ fontWeight: "bolder" }}
                              variant="body2"
                            >
                              {item.product.name}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                              component="div"
                            >
                              {moneyFormater(item.product.price)}
                            </Typography>
                          </CardContent>
                        </div>
                      </Card>
                      <Divider />
                    </Box>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
    </Paper>
  ) : (
    <></>
  );
};
export default RelateCombo;
