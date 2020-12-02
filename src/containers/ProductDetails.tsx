import React from "react";
import { Container, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DetailsCard from "../components/DetailsCard";
import Image from "material-ui-image";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(10),
      padding: theme.spacing(5),
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(3),
    },
  })
);

const ProductDetails = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root} elevation={15}>
        <Container>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Image src="http://loremflickr.com/500/500" />
            </Grid>
            <Grid item md={6} xs={12}>
              <DetailsCard />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};
export default ProductDetails;
