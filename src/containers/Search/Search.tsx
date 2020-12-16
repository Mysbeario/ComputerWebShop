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
import Product from "./Product";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import { useForm } from "react-hook-form";
import { SearchRounded } from "@material-ui/icons";

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
    m: {
      marginTop: theme.spacing(4),
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
  const [searchString, setSearchString] = useRecoilState(searchState);
  const [product, setProduct] = useState([]);
  const { register, errors, handleSubmit } = useForm<SearchInfo>();
  const [selectedCategory, setSelectedCategory]: any = useState();
  const [value, setValue] = React.useState<number[]>([10000, 12500000]);
  const [category, setCategory] = useRecoilState(categoryState);

  const searchFunction = async () => {
    console.log("search: " + searchString.value);
    const respone = await Axios.get(
      url + "?" + searchString.key + "=" + searchString.value
    );
    console.log(respone);
    console.log(url + searchString.key + "=" + searchString.value);
    setProduct(respone.data);
  };

  const getCategory = async (): Promise<void> => {
    const categoryRespone = await Axios("http://localhost:5000/api/category");
    setCategory(categoryRespone.data);
  };
  useEffect(() => {
    console.log(category);
    console.log(category === []);
    setTimeout(searchFunction, 500);
    if (category.length === 0) {
      console.log("vo");
      getCategory();
    }
  }, []);

  const formatCategory = (categoryId: any) => {
    var name = "";
    category.forEach((c: any) => {
      if (c.id == categoryId) {
        console.log(categoryId + " = " + c.id);
        name = c.name;
      }
    });
    return name;
  };
  const handleUpdate = async (searchInfo: SearchInfo): Promise<void> => {
    let newURL = url + "?";
    if (searchInfo.content) {
      newURL += "&" + "search=" + searchInfo.content;
    }
    if (selectedCategory) {
      newURL += "&" + "category=" + selectedCategory;
    }
    if (searchInfo.priceFrom) {
      newURL += "&" + "minprice=" + searchInfo.priceFrom;
    }
    if (searchInfo.priceTo) {
      newURL += "&" + "maxprice=" + searchInfo.priceTo;
    }

    const product = await Axios.get(newURL);
    setSearchString({ key: "", value: "" });
    setProduct(product.data);

    console.log(newURL);
    console.log(searchInfo.priceFrom);
  };

  return (
    <div>
      <AppBar />

      <Container className={classes.p}>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Grid container spacing={4}>
            <Grid item md={3} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="content"
                label="Search"
                inputRef={register({ required: false })}
                variant="outlined"
                color="secondary"
              />
            </Grid>

            <Grid item md={3} sm={12}>
              <Autocomplete
                options={category}
                getOptionLabel={(option: any) => option.name}
                onChange={(e, data) => {
                  if (data !== null) setSelectedCategory(data.id);
                  else setSelectedCategory(undefined);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="outlined" />
                )}
              />
            </Grid>

            <Grid item md={2} sm={12}>
              <TextField
                label="Price from"
                fullWidth
                variant="outlined"
                name="priceFrom"
                inputRef={register({ required: false })}
                type="number"
                color="secondary"
              />
            </Grid>
            <Grid item md={2} sm={12}>
              <TextField
                label="To... "
                fullWidth
                type="number"
                variant="outlined"
                name="priceTo"
                inputRef={register({ required: false })}
                color="secondary"
              />
            </Grid>
            <Grid item md={2} sm={12}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                type="submit"
                style={{ fontWeight: 700, height: "100%" }}
                color="secondary"
                startIcon={<SearchRounded />}
              >
                Find
              </Button>
            </Grid>
            {/* <Grid item md={1} sm={12}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                type="button"
                onClick={() => {
                  searchFunction();
                }}
                style={{ fontWeight: 700, height: "100%" }}
                color="secondary"
                //startIcon={<SearchRounded />}
              >
                Refresh
              </Button>
            </Grid> */}
          </Grid>
        </form>
        <Divider className={classes.m} />
        <Grid container spacing={4}>
          <Grid item md={12} sm={12}>
            <Typography variant="h5">
              {formatCategory(searchString.value)}
            </Typography>
          </Grid>
          <Grid item md={12} sm={12}>
            {/* <Typography variant="h6">
              {SearchTextFormater(
                searchString.key,
                searchString.value,
                product
              )}
            </Typography> */}
          </Grid>

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
