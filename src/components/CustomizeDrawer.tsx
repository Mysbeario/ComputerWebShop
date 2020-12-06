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
  const [open, setOpen] = React.useState(false);
  const url = "http://localhost:5000/api/category";
  const [category, setCategory] = useState([]);

  useEffect(() => {
    (async () => {
      const respone = await Axios(url);
      setCategory(respone.data);
    })();
  }, []);

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
          <ListItem>
            <img
              src="https://www.upsieutoc.com/images/2020/12/04/gamehub.png"
              height="35px"
            />
          </ListItem>
          <ListItem>
            <Typography variant="body1">Enjoy Christmas Sale !</Typography>
          </ListItem>
        </List>

        <Divider />
        <List component="nav" className={classes.root}>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Promotion" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleClick}>
            <ListItemText primary="Category" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category.map((c: any) => (
                <ListItem key={c.id} button className={classes.nested}>
                  <ListItemText primary={c.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
    </div>
  );
};
export default CustomizeDrawer;
