import {
  makeStyles,
  Button,
  Card,
  Typography,
  ButtonGroup,
  IconButton,
  CardActions,
  CardContent,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@material-ui/core";
import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginTop: 24,
    marginBottom: 24,
  },
});

const DetailsCard = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Macbook Pro 2018
        </Typography>
        <Typography variant="h5" gutterBottom>
          21.900.000 VND
        </Typography>
        <Accordion className={classes.pos} elevation={3} color="secondary">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.pos}>
              Đặc tính kỹ thuật
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <ButtonGroup variant="outlined" disableElevation color="primary">
          <Button>+</Button>
          <Button>1</Button>
          <Button>-</Button>
        </ButtonGroup>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary">
          Mua Ngay
        </Button>
        <Button variant="outlined" color="secondary">
          Thêm vào giỏ hàng
        </Button>
      </CardActions>
    </Card>
  );
};

export default DetailsCard;
