import {
  Paper,
  List,
  Typography,
  Divider,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  PaperProps,
} from "@material-ui/core";
import ReceiptIcon from "@material-ui/icons/Receipt";
import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Work,
  Folder as FolderIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import Axios from "axios";
import {
  getReceiptState,
  moneyFormater,
} from "../../components/ReuseableFunction";
import { useRecoilValue } from "recoil";
import { accountState } from "../state";
import OrderReview from "./OrderReview";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: (theme.spacing(5), theme.spacing(2)),
    },
    pl: {
      marginLeft: theme.spacing(3),
    },
    padding: {
      margin: (theme.spacing(4), theme.spacing(0)),
    },
  })
);
const titleFormater = (e: any) => {
  let title = "";
  if (e.combos.length !== 0) {
    title += "Combo: " + e.combos.length + " ";
  }
  if (e.combos.length !== 0 && e.details.length !== 0) {
    title += "and ";
  }
  if (e.details.length !== 0) {
    title += "Product: " + e.details.length;
  }
  return title;
};
const defaultReceiptValue = {
  customer: {},
  recipient: "",
  address: "",
  phone: "",
  status: 0,
  date: "0/0/0000",
  totalCost: 0,
  details: [],
  combos: [],
  id: -1,
};
const OnCartList = (): JSX.Element => {
  const account = useRecoilValue(accountState);
  const [receipt, setReceipt] = useState([defaultReceiptValue]);
  const url = "http://localhost:5000/api/receipt/?customerId=" + account.id;

  function PaperComponent(props: PaperProps) {
    return (
      <Paper>
        <Paper {...props} />
      </Paper>
    );
  }

  const onCancelClick = async (receipt: any): Promise<void> => {
    var cancel = confirm("Cancel order ?");
    if (cancel) {
      const newReceipt = { ...receipt, status: 2 };
      console.log(newReceipt);

      try {
        await Axios.put("http://localhost:5000/api/receipt/", newReceipt, {
          withCredentials: true,
        });
        getReceipts();
      } catch (e) {}
    }
  };
  const getReceipts = async (): Promise<void> => {
    const respone = await Axios.get(url);
    setReceipt(respone.data);
  };
  useEffect(() => {
    getReceipts().catch(() => {
      getReceipts();
    });
  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [chosenReceipt, setChosenReceipt] = React.useState({ status: 0 });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper elevation={3} className={classes.paper}>
      <List
        subheader={
          <div>
            <Typography
              variant="h5"
              component="h4"
              color="inherit"
              gutterBottom
            >
              My orders
            </Typography>
          </div>
        }
      >
        <Divider />
        {receipt.map((e: any) => (
          <div>
            <ListItem
              button
              onClick={() => {
                setChosenReceipt(e);
                setOpen(true);
              }}
              className={classes.padding}
            >
              <ListItemAvatar>
                <Avatar variant="square">#{e.id}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div>
                    <Typography variant="body2"> </Typography>

                    <Typography style={{ fontWeight: "bold" }} variant="body2">
                      {titleFormater(e)}
                    </Typography>
                    <Typography variant="body1">
                      {moneyFormater(e.totalCost)}
                    </Typography>
                  </div>
                }
                secondary={"Order date: " + e.date}
              />

              <ListItemSecondaryAction>
                <Typography
                  variant="inherit"
                  style={{ fontWeight: "bold" }}
                  color="primary"
                >
                  {getReceiptState(e.status)}
                </Typography>
                <Button
                  className={classes.pl}
                  size="small"
                  style={{ fontWeight: "bold" }}
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    setChosenReceipt(e);
                    setOpen(true);
                  }}
                >
                  Details
                </Button>
                {e.status === 0 ? (
                  <Button
                    className={classes.pl}
                    size="small"
                    variant="outlined"
                    onClick={() => onCancelClick(e)}
                  >
                    cancel
                  </Button>
                ) : (
                  <></>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle>
          Order Summary -{" "}
          <Button> {getReceiptState(chosenReceipt.status)}</Button>
        </DialogTitle>
        <DialogContent dividers>
          <OrderReview {...chosenReceipt} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
export default OnCartList;
