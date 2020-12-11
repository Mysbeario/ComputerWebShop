import React, { useEffect, useState } from "react";
import { Box, CardMedia, Container, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard";
import Image from "material-ui-image";
import AppBar from "../../components/AppBar";
import Axios from "axios";
import RelateCombo from "./RelateCombo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(11),
      marginRight: theme.spacing(11),
      marginTop: theme.spacing(8),
      padding: theme.spacing(5),
      marginBottom: theme.spacing(2),
    },
    paper: {
      height: 140,
      width: 150,
    },
    img: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      padding: theme.spacing(5),
      marginBottom: theme.spacing(2),
    },
    control: {
      padding: theme.spacing(3),
    },
    image: {
      maxHeight: "100",
    },
  })
);
interface Params {
  productId: string;
}
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  amount: number;

  category: {
    id: number;
    name: string;
  };
  image: string;
}
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

const ProductDetails = (): JSX.Element => {
  const classes = useStyles();
  let params: Params = useParams();
  const url = "http://localhost:5000/api/product/" + params.productId;
  const [product, setProduct] = useState<Product>(initValue);

  const getProductDetails = async (): Promise<void> => {
    const { data } = await Axios.get(url);
    console.log(data);
    setProduct(data);
  };

  useEffect(() => {
    getProductDetails().catch((e) => {
      getProductDetails();
    });
  }, [product]);
  return (
    <>
      <AppBar />
      <Paper className={classes.root} elevation={5}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12} className={classes.image}>
            <CardMedia
              src={
                product.image
                  ? "http://localhost:5000/api/image/" + product.image
                  : ""
              }
              component="img"
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Box>
              <DetailsCard product={product} />
              <RelateCombo productId={params.productId} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
export default ProductDetails;
