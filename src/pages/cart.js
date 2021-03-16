import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { getCart, fetchAddress } from "../redux/actions/dataActions";
import Spinner from "../util/spinner/spinner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MyButton from "../util/MyButton";

//custom-hook
import useForm from "../hooks/forms";

import CartItem from "../components/CartItem";

// StripeComponent
import StripeContainer from "../components/StripeContainer";



// to make the style

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "40px 0px 20px 128px",
    display: "inline-block",
    marginRight: "40%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  checkoutButton: {
    backgroundColor: "#1266f1",
    color: "white",
    marginBottom: 20,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      color: "#bfbfbf",
    },
  },
  spanboss:{
    color: 'blue',
    fontSize: 14
  },
  '@media only screen and (max-width: 750px)': {
    gridStripe:{

      width: '90vw'
    }
  }
}));

const Cart = (props) => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, cart, price } = useSelector((state) => state.data); // here is the cart
  //creator is the name of the restaurant that created this, need creator and id (and after also location)
  const { errors } = useSelector((state) => state.UI);
  const history = useHistory();

  const [big, setBig] = useState(false)

  console.log(history)

  let deliveryCharge = 0;
  let cartPresent = Array.isArray(cart) && cart.length > 0;
  let cartItems = cartPresent ? cart.length : 0;

  let streetError = null;
  let aptError = null;
  let localityError = null;
  let zipError = null;
  let phoneNoError = null;

  if (price !== 0) deliveryCharge = 0; // change the delivery charge (maybe always 2 euros)

  const handlePlaceOrder = () => {
    const userData = {
      street: inputs.street,
      aptName: inputs.aptName,
      locality: inputs.locality,
      zip: inputs.zip,
      phoneNo: inputs.phoneNo,
    };
    dispatch(fetchAddress(userData, history));
    setBig(true)
  };

  const { inputs, handleInputChange } = useForm({
    street:
      props.location.state.address != null &&
      // eslint-disable-next-line
      props.location.state.address != undefined
        ? props.location.state.address.street
        : "",
    locality:
      props.location.state.address != null &&
      // eslint-disable-next-line
      props.location.state.address != undefined
        ? props.location.state.address.locality
        : "",
    aptName:
      props.location.state.address != null &&
      // eslint-disable-next-line
      props.location.state.address != undefined
        ? props.location.state.address.aptName
        : "",
    zip:
      props.location.state.address != null &&
      // eslint-disable-next-line
      props.location.state.address != undefined
        ? props.location.state.address.zip
        : "",
    phoneNo:
      props.location.state.address != null &&
      // eslint-disable-next-line
      props.location.state.address != undefined
        ? props.location.state.address.phoneNo
        : "",
  });

  useEffect(() => {
    console.log("in useEffect cart");
    dispatch(getCart());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (errors) {
    for (let error of errors) {
      if (error.msg.includes("10 digit phone")) phoneNoError = error.msg;
      if (error.msg.includes("Zipcode cannot")) zipError = error.msg;
      if (error.msg.includes("Locality cannot")) localityError = error.msg;
      if (error.msg.includes("Apartment name cannot")) aptError = error.msg;
      if (error.msg.includes("Street cannot")) streetError = error.msg;
    }
  }



  return (
    
    <>
      
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Typography variant="h5" className={classes.title}>
            {step === 1 && `Cart (${cartItems} Items)`}
            {/* We render the cartItems here */}
            {step === 2 && "Informations*: Remplir attentivement"}
            {/* We add a step 3 for the credit card */}
            {step === 3 && "Moyen de paiement"}
            {/* The steps allows to select what is rendered */}
            {/* Maybe it is not useful to add the address again because we ask for it at the beginning */}
          </Typography>
          {step === 2 && (
            <MyButton tip="Go Back" onClick={prevStep}>
              <KeyboardBackspaceIcon />
            </MyButton>
          )}
          {step === 3 && (
              <MyButton tip="Go Back" onClick={prevStep}>
                <KeyboardBackspaceIcon />
              </MyButton>
          )}
          <Grid container direction="row" spacing={2}>
            <Grid item sm={1} />
            <Grid item sm={7}>
              {cartPresent &&
                step === 1 &&
                cart.map((item) => (
                  <>
                  <CartItem {...item} key={item.itemId._id} />
                  {/* the id of the product is what whe want  */}
                  </>
                ))}
                {/* This is where we render the items */}
              {step === 2 && (
                <form>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ margin: "10px 10px 2px 10px" }}
                  >
                    Address:
                  </Typography>
                  <div className={classes.address}>
                    <TextField
                      id="aptName"
                      name="aptName"
                      label="Numéro d'étage"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={inputs.aptName}
                      helperText={aptError}
                      error={aptError ? true : false}
                      fullWidth
                      required
                    />
                    <TextField
                      id="locality"
                      name="locality"
                      label="Ville"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={inputs.locality}
                      helperText={localityError}
                      error={localityError ? true : false}
                      fullWidth
                      required
                    />
                    <TextField
                      id="street"
                      name="street"
                      label="Rue"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={inputs.street}
                      helperText={streetError}
                      error={streetError ? true : false}
                      fullWidth
                      required
                    />
                    <TextField
                      id="zipCode"
                      name="zip"
                      label="Code Postal"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={inputs.zip}
                      helperText={zipError}
                      error={zipError ? true : false}
                      type="number"
                      fullWidth
                      required
                    />
                    <TextField
                      id="phoneNo"
                      name="phoneNo"
                      label="Numéro de Contact"
                      className={classes.textField}
                      type="number"
                      onChange={handleInputChange}
                      value={inputs.phoneNo}
                      helperText={phoneNoError}
                      error={phoneNoError ? true : false}
                      fullWidth
                      required
                    />
                  </div>
                </form>
              )}
              {step === 3 && (


                <Grid className={classes.gridStripe}>

                {/* Here we put the stripe check, we add a handleSubmit option that contacts the server, we just put the stripeContainer */}
                {/* <Elements stripe={stripePromise}>
                  <CardElement

                    options={{
                      style: {
                        base: {
                          marginTop: "30px",
                          fontSize: '24px',
                          borderRadius: "10px",
                          backgroundColor: "#E8E8E8",
                          color: "#424770",
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146'
                        },
                      },
                    }}
                    
                    
                    
                     />
                </Elements> */}

                {/* We replace the price by the id of the product */}
                  <StripeContainer cart={cart} place={handlePlaceOrder} />
                  {/* We pass in all the cart */}
                  
                </Grid>

              )}
            </Grid>
            
            <Grid item sm={3}>
              <Paper
                className={classes.paper}
                style={{ backgroundColor: "#faf7f7" }}
                elevation={4}
              >
                <div style={{ marginLeft: 20, marginRight: 20 }}>
                  <br />
                  <Typography gutterBottom variant="h5" noWrap>
                    {/* The typography is not the same according to the steps */}
                    {step === 1 && "Total Amount"}
                    {step === 2 && "Order Summary"}
                    <br />
                    <br />
                  </Typography>
                  {step === 1 && (
                    <Typography variant="body2" color="textPrimary">
                      <div className={classes.spaceTypo}>
                        <span>Initial amount</span>
                        <span> {price} €</span>
                      </div>
                      <br />
                      <br />
                      <div className={classes.spaceTypo}>
                        <span>Delivery Charge</span>
                        <span> {deliveryCharge} €</span>
                      </div>
                      <br />
                    </Typography>
                  )}
                  {step === 2 &&
                    cart.map((item) => {
                      return (
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          key={item.itemId._id}
                        >
                          <div className={classes.spaceTypo}>
                            <span>{item.itemId.title}</span>
                            <span>
                              €
                              {item.itemId.price} x {item.quantity}
                            </span>
                          </div>
                          <br />
                        </Typography>
                      );
                    })}
                  <hr />
                  
                  <Typography gutterBottom variant="h5" noWrap>
                    <div className={classes.spaceTypo}>
                      <span>Total</span>
                      {big ? 
                      <span className={classes.spanboss}>Patienter pour <br/> le paiement...</span>
                      :
                      <>
                      </>
                      }
                      <span> {price + deliveryCharge} €</span>
                    </div>
                    <br />
                  </Typography>
                  {step === 1 && (
                    <Button
                      fullWidth
                      className={classes.checkoutButton}
                      disabled={price === 0}
                      onClick={nextStep}
                    >
                      Faire le checkout
                    </Button>
                  )}
                  {step === 2 && (
                    <Button
                      fullWidth
                      className={classes.checkoutButton}
                      onClick={nextStep}
                    >
                      Je paie

                      {/* Here we change the {handlePlaceOrder position to after} */}
                    </Button>
                  )}
                  
                  

                    
                </div>
              </Paper>
            </Grid>
            <Grid item sm={1} />
          </Grid>
        </>
      )}
    </>
  );
};

export default Cart;
