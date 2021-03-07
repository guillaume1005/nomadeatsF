import React from "react";
//redux
import { useSelector } from "react-redux";

//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Spinner from "../util/spinner/spinner";
import SwipeableImages from "./SwipeableImages";

// import react responsive for the style

import { useMediaQuery } from 'react-responsive'

const useStyles = makeStyles({
  borderBottom: {
    borderBottom: "2px solid #000",
    position: "absolute",
    top: "25.5%",
    left: "6.5%",
    bottom: 0,
    height: "40%",
    width: "44%",
  },
  borderLeft: {
    borderLeft: "2px solid #000",
    position: "absolute",
    top: "25.5%",
    left: "6.5%",
    bottom: 0,
    height: "40%",
  },
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
});

function Restaurant(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' }) // this is a hook

  
  const classes = useStyles();
  const { loading } = useSelector((state) => state.data);
  const {
    name,
    imageUrl,
    tags,
    costForOne,
    minOrderAmount,
    payment,
    address,
  } = props;
  let paymentString;
  let phoneNo;
  let addressString;

  if (address) {
    phoneNo = address.phoneNo;
    addressString = `${address.aptName}, ${address.locality}, ${address.street}`;
  }

  if (payment ? payment.length === 1 : null)
    paymentString = `Accepts ${payment[0].toLowerCase()} payment`;

  if (payment ? payment.length === 2 : null)
    paymentString = `Accepts ${payment[0].toLowerCase()} & ${payment[1].toLowerCase()} payments`;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid container direction="row">
            <Grid item xs={false} sm={1} />
            <Grid item xs={12} sm={6} style={{ marginTop: 120 }}>
            {/* Before it was marginTop of 120 */}
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                style={{ fontStyle: "bold" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {tags}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Costs Rs.{costForOne} for one
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Commande minimale de {minOrderAmount}€
              </Typography>
              <Typography variant="body2" color="textPrimary">
                {paymentString}
              </Typography>
              <br />
              <Typography variant="body2" color="textPrimary">
                Addresse: {addressString}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Tel: +33 {phoneNo}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Ouvert
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: 34 }}>
              {imageUrl ? (
                <SwipeableImages images={imageUrl} type="restaurant" />
              ) : null}
            </Grid>
            { !isTabletOrMobile &&
            <>
              <div className={classes.borderLeft}></div>
              {/* This is where the border is, no display on the phone */}
              <div className={classes.borderBottom}></div>
              </>
            }
            <Grid item xs={false} sm={1} />
          </Grid>
        </>
      )}
    </>
  );
}

export default React.memo(Restaurant);
