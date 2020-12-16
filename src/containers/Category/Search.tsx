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
  TextField,
  Slider,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "../../components/AppBar";
import CustomizeCarousel from "../../components/CustomizeCarousel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { categoryState, searchState } from "../state";
import Product from "../Search/Product";

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
interface SearchInfo {
  content: string;
  category: string;
  priceFrom: string;
  priceTo: string;
}
const Search = (): JSX.Element => {
  const classes = useStyles();
  const url = "http://localhost:5000/api/product/";
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useRecoilState(categoryState);
  const param: any = useParams();
  // const formatCategory = (id: any, source: any) => {
  //   var name = "";
  //   console.log(source);
  //   source.forEach((c: any) => {
  //     if (c.id === id) {
  //       name = c.name;
  //     }
  //   });
  //   return name;
  // };
  const [title, setTitle] = useState<string>();

  const searchFunction = async () => {
    const responeCategory = await Axios.get(
      "http://localhost:5000/api/category"
    );
    setCategory(responeCategory.data);
    const respone = await Axios.get(url + "?category=" + param.category);
    setProduct(respone.data);
  };
  const urlCategory = "http://localhost:5000/api/category";

  const getCategory = async (): Promise<void> => {
    const categoryRespone = await Axios(urlCategory);
    setCategory(categoryRespone.data);
  };
  useEffect(() => {
    getCategory().catch(() => {
      getCategory();
    });
  }, []);

  useEffect(() => {
    setTimeout(searchFunction, 0);
  }, [param.category]);

  return (
    <div>
      <AppBar />

      <Container className={classes.p}>
        <Grid container spacing={4}>
          <Grid item md={12} sm={12}>
            <Typography variant="h3">{title}</Typography>
          </Grid>
          <Grid item md={12} sm={12}></Grid>

          {product.map((item) => (
            <Grid item md={3} sm={12}>
              <Product {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default Search;
