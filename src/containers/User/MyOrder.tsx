import { Paper, List, Typography, Divider } from "@material-ui/core";

import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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
          <Typography variant="h5" component="h4" color="inherit" gutterBottom>
            My orders
          </Typography>
        }
      >
        <Divider />
        {/* <ListItem>
            {console.log(cart)}
            {cart.combo.length != 0 ? (
              <Typography
                variant="h6"
                component="h4"
                color="inherit"
                gutterBottom
              >
                Combo
              </Typography>
            ) : (
              <></>
            )}
          </ListItem> */}
      </List>
    </Paper>
  );
};
export default OnCartList;
