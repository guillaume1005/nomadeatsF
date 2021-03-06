import React from "react";
import { useSelector } from "react-redux";

//M-UI
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import RestaurantCard from "./RestaurantCard";

// for the style

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  

  '@media only screen and (max-width: 750px)':{
    text:{
      display: 'none' // we remove the text for the phones
    },
    parag:{
      display: 'none'
    }
  }
}))

const RestaurantContent = () => {

  
  const classes = useStyles(); // this is where we put the hook
  const { restaurants } = useSelector((state) => state.data);
  const restaurantArray = restaurants.restaurants;

  const getRestaurantCard = (restaurantObj) => {
    return (
      <Grid item xs={12} sm={3} key={restaurantObj._id}>
        <RestaurantCard {...restaurantObj} />
      </Grid>
    );
  };
  return (
    <>
      <Typography className={classes.text}
        gutterBottom
        variant="h6"
        color="textPrimary"
        component="p"
        noWrap
      >
        Mangez chez votre Restau préféré -
      </Typography>
      <br />
      <Grid container spacing={2}>
        {restaurantArray ? (

          restaurantArray.length > 0 ? (
            restaurantArray.map((restaurant) => getRestaurantCard(restaurant))
          ) : (
            <p>
              Pas de restaurants dans votre secteur. Revenez plus tard !
            </p>
          )
        ) : (

                  
          <p className={classes.parag}>Rentrez votre addresse pour voir les restaurants près de chez vous !</p>
          
          
        )}
      </Grid>
    </>
  );
};

export default RestaurantContent;
