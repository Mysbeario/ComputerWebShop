import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import AppBar from "../../components/AppBar";
import Review from "./Review";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, cartState, shippingInfoState } from "../state";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  padding: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

const Checkout = function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const account = useRecoilValue(accountState);
  const history = useHistory();
  const [shippingInfo] = useRecoilState(shippingInfoState);
  const [cart, setCart] = useRecoilState(cartState);
  const [receiptID, setReceipId] = useState();

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  useEffect(() => {
    if (!account.name && !account.email && !account.address && !account.phone) {
      history.push("/login");
    }
  }, [account]);

  const handleCheckout = async (receipt: any): Promise<void> => {
    try {
      const respone = await Axios.post(
        "http://localhost:5000/api/receipt/",
        receipt,
        {
          withCredentials: true,
        }
      );
      setCart({ product: [], combo: [] });
      setReceipId(respone.data);
    } catch (e) {}
  };

  const handleNext = (activeStep: number) => {
    if (activeStep === steps.length - 1) {
      const receipt = {
        recipient: shippingInfo.name,
        address: shippingInfo.address,
        phone: shippingInfo.phone,
        customer: {
          id: account.id,
        },
        details: cart.product,
        combos: cart.combo,
      };
      handleCheckout(receipt);
      console.log(receipt);
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <AppBar />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                {receiptID !== undefined ? (
                  <>
                    {" "}
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #{receiptID}. We have emailed your
                      order confirmation, and will send you an update when your
                      order has shipped.
                    </Typography>
                    <Button
                      className={classes.padding}
                      onClick={() => history.push("/user")}
                      variant="contained"
                      size="large"
                      color="primary"
                      fullWidth
                    >
                      My Orders
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNext(activeStep)}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};
export default Checkout;
