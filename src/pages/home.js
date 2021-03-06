import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import HomeStart from "../components/HomeStart";
import SearchBar from "../components/SearchBar";
import Spinner from "../util/spinner/spinner";
import RestaurantContent from "../components/RestaurantContent";



// import store from "../redux/store";
// import { fetchRestaurantsByAddress } from "../redux/actions/dataActions";

const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center",
  },
  center2: {
    textAlign: "center",
  },
  SearchBar: {
    margin: "24px 0 28px 360px",
  },

  '@media only screen and (max-width: 750px)': {
    center: {
      display: 'none'
    },
    SearchBar:{
      margin: 0,
      width: '100vw'
    }

  }
}));

const Home = () => {
  
  const classes = useStyles();
  const { loading } = useSelector((state) => state.data);
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);
  const [locationStatus, setLocationStatus] = useState(
    localStorage.getItem("location") ? true : false // we pass the props, that communicates thanks to the hook
  );

  // let latlng = localStorage.getItem("latlng");

  // if (latlng) {
  //   const latlngArray = latlng.split(", ");
  //   dispatch(fetchRestaurantsByAddress(latlngArray[0], latlngArray[1]));
  // }

  let restaurantMarkup = loading ? <Spinner /> : <RestaurantContent />;
  return (
    <>
      {authenticated && role === "ROLE_SELLER" ? (
        <Redirect to="/seller/dashboard" />
      ) : (
        <>
          <HomeStart />
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5" className={classes.center} noWrap>
                Votre plat favori, livré avec NomadEats&nbsp;&nbsp;
                <span style={{ fontSize: 40 }}>🍽</span>
                <br/>
                Votre lieu:
              </Typography>
            </Grid>
            <Grid item className={classes.SearchBar}>
              <SearchBar page="home" action={setLocationStatus} />
            </Grid>
            <Grid item container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={10}>
                {/* 
                All this was before
                {locationStatus ? (
                  restaurantMarkup
                ) : (
                  
                  <> */}
                  {/* <Typography variant="body1" className={classes.center} noWrap>
                    Entrez votre addresse pour voir les restaurants à côté de chez vous
                  </Typography> */}

                  {/* Always display something*/}
                  {/* </>
                  
                )} */}


                {/* Now we display always something */}

                {locationStatus ?
                restaurantMarkup
                :

                // the initial position is the one of beity
                restaurantMarkup
                } 
                {/* this is to show this is javascript, javascript can render a component also */}
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
