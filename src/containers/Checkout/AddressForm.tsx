import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, shippingInfoState } from "../state";

const AddressFrom = function () {
  const account = useRecoilValue(accountState);
  const [shippingInfo, setShippingInfo] = useRecoilState(shippingInfoState);
  const history = useHistory();
  useEffect(() => {
    setShippingInfo({
      name: account.name,
      address: account.address,
      phone: account.phone,
    });
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
        {console.log(shippingInfo)}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            defaultValue={account.name}
            label="Fullname"
            fullWidth
            onChange={(e) => {
              setShippingInfo({ ...shippingInfo, name: e.target.value });
              console.log(shippingInfo);
            }}
            autoComplete="given-name"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            defaultValue={account.address}
            label="Address"
            onChange={(e) => {
              setShippingInfo({ ...shippingInfo, address: e.target.value });
              console.log(shippingInfo);
            }}
            fullWidth
            autoComplete="Address line 1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            name="phone"
            defaultValue={account.phone}
            label="Phone number"
            onChange={(e) => {
              setShippingInfo({ ...shippingInfo, phone: e.target.value });
              console.log(shippingInfo);
            }}
            fullWidth
            autoComplete="Phone number"
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid> 
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>*/}
      </Grid>
    </React.Fragment>
  );
};
export default AddressFrom;
