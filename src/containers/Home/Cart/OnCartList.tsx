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
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  image: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const OnCartList = ({ cart }: any): JSX.Element => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paper}>
      <List
        subheader={
          <Typography
            variant="h5"
            component="h4"
            color="textSecondary"
            gutterBottom
          >
            Cart items
          </Typography>
        }
      >
        <Divider />
        {cart.map((item: any) => (
          <ListItem key={item.id}>
            <ProductCard {...item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
export default OnCartList;
