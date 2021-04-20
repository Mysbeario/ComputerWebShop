import {
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import Carousel from "react-material-ui-carousel";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      paddingLeft: theme.spacing(4),
    },
    p: {
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);
const CustomizeCarousel = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Carousel>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="360"
          width="720"
          src={require("../assets/banner1.png")}
          title="Contemplative Reptile"
        />
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="360"
          width="720"
          src={require("../assets/banner2.png")}
          title="Contemplative Reptile"
        />
      </Carousel>
    </div>
  );
};
export default CustomizeCarousel;
