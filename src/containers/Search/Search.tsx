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
const Search = (): JSX.Element => {
  const classes = useStyles();
  const url = "http://localhost:5000/api/product";

  const [product, setProduct] = useState([]);
  const location = useLocation();
  const message = (location.state as IState).query;
  useEffect(() => {
    (async () => {
      const respone = await Axios.get(url);
      setProduct(respone.data);
    })();
  }, []);

  return (
    <div>
      <AppBar />

      <Container className={classes.p}>
        <Grid container spacing={4}>
          <Grid item md={3} sm={12}>
            Searching "{message}"
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Search;
