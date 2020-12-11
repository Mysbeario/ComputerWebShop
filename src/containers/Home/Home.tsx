import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  Box,
  ListItem,
  ListItemText,
  CardMedia,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HomePageProductCard from "./HomePageProductCard";
import AppBar from "../../components/AppBar";
import CustomizeCarousel from "../../components/CustomizeCarousel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useRecoilState } from "recoil";
import { cartState } from "../state";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {},
    p: {
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(5),
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);
const Home = (): JSX.Element => {
  const classes = useStyles();
  const url = "http://localhost:5000/api/product";
  const [product, setProduct] = useState([]);
  const getProducts = async (): Promise<void> => {
    const respone = await Axios.get(url);
    setProduct(respone.data);
  };
  useEffect(() => {
    getProducts().catch(() => {
      getProducts();
    });
  }, [product]);

  return (
    <div>
      <AppBar />

      <Container className={classes.p}>
        <Grid container spacing={4}>
          <Grid item md={12} sm={12}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="65"
              width="100%"
              src="https://www.upsieutoc.com/images/2020/12/04/Pre-oder-Apple-chip-M1-2020-1200x65.jpg"
              title="Contemplative Reptile"
            />
          </Grid>
          <Grid item md={3} sm={12}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="92%"
              width="100%"
              src="https://www.upsieutoc.com/images/2020/12/06/280x260-Uudailenovo-2020.png"
              title="Contemplative Reptile"
            />
          </Grid>
          <Grid item md={9} sm={12}>
            <CustomizeCarousel />
          </Grid>

          <Grid item md={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              New Arrival
            </Typography>
            <Divider />
          </Grid>
          {product.map((each: any) => (
            <Grid className={classes.grid} item md={3} sm={12}>
              <HomePageProductCard {...each} />
            </Grid>
          ))}
          <Grid item md={12} sm={12}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="65"
              src="https://www.upsieutoc.com/images/2020/12/06/1200x65-Sale-me-ly-new.png"
              title="Contemplative Reptile"
            />
          </Grid>
          <Grid item md={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              On Sale
            </Typography>
            <Divider />
          </Grid>
          {product.map((each: any) => (
            <Grid item md={3} sm={12}>
              <HomePageProductCard {...each} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default Home;
