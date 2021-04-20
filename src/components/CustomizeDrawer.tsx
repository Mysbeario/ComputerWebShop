import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  ListSubheader,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  StarBorder,
  ArrowRight,
} from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchState, categoryState } from "../containers/state";
import { useHistory } from "react-router-dom";
interface Props {
  drawerOpenState: boolean;
  setDrawerOpenState: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      minWidth: 250,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);
const CustomizeDrawer = ({
  drawerOpenState,
  setDrawerOpenState,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const setSearchState = useSetRecoilState(searchState);
  const history = useHistory();
  const [category, setCategory] = useRecoilState(categoryState);
  // const url = "http://localhost:5000/api/category";

  // const getCategory = async (): Promise<void> => {
  //   const respone = await Axios(url);
  //   setCategory(respone.data);
  // };

  // useEffect(() => {
  //   getCategory();
  // }, []);

  const onCategoryClick = (categoryId: string, categoryName: string) => {
    setSearchState({ key: "category", value: categoryId });
    setDrawerOpenState();
    history.push("/category/" + categoryId);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Drawer
        anchor={"left"}
        open={drawerOpenState}
        onClose={(): void => setDrawerOpenState()}
      >
        <List>
          <ListItem button onClick={() => history.push("/")}>
            <img src={require("../assets/logo.png")} height="35px" />
          </ListItem>
          <ListItem>
            <Typography variant="body1">2020 Sale Season</Typography>
          </ListItem>
        </List>

        <Divider />
        <List component="nav" className={classes.root}>
          <ListItem
            button
            onClick={() => {
              console.log("click!");
              history.push("/");
            }}
          >
            <ListItemText primary="Home" secondary="Gamehub.com" />
          </ListItem>

          <ListItem button>
            <ListItemText
              primary="All products"
              onClick={() => {
                console.log("click!");
                history.push("/search");
              }}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Promotion"
              onClick={() => history.push("/")}
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
export default CustomizeDrawer;
