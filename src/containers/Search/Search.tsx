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
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "../../components/AppBar";
import CustomizeCarousel from "../../components/CustomizeCarousel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "../state";
import Product from "./Product";

interface IState {
  query?: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      paddingLeft: theme.spacing(4),
    },
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
interface Params {
  search: string;
}
const SearchTextFormater = (key: string, value: string, product: any) => {
  if (key === "search") {
    return product.length + " result for " + "'" + value + "'";
  }
};
const Search = (): JSX.Element => {
  const classes = useStyles();
  const url = "http://localhost:5000/api/product/?";
  const [searchString] = useRecoilState(searchState);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const respone = await Axios.get(
        url + searchString.key + "=" + searchString.value
      );
      console.log(respone);
      console.log(url + searchString.key + "=" + searchString.value);
      setProduct(respone.data);
    })();
  }, [searchString]);

  return (
    <div>
      <AppBar />

      <Container className={classes.p}>
        <Grid container spacing={4}>
          <Grid item md={3} sm={12}>
            <Typography variant="h6">
              {SearchTextFormater(
                searchString.key,
                searchString.value,
                product
              )}
            </Typography>
          </Grid>
          {product.map((item) => (
            <Grid item md={12} sm={12}>
              <Product {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default Search;
