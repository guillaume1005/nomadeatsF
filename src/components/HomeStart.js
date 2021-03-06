import React from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import cover from "../images/food_upscaled.png";

// for the style

import { useMediaQuery } from 'react-responsive'

const useStyles = makeStyles((theme) => ({
  presentation: {
    display: "flex",
    width: "90%",
    margin: "auto",
    minHeight: "80vh",
    alignItems: "center",
    // eslint-disable-next-line
    ["@media (max-width:1024px)"]: {
      flexDirection: "column",
    },
  },
  introduction: {
    flex: 1,
    paddingLeft: 60,
    height: "340px",
  },
  safeFood: {
    fontSize: 64,
    fontWeight: 400,
    // put maybe in the center
  },
  delivery: {
    color: "#157a21",
    fontSize: 64,
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 20,
  },
  delivery2: {
    color: "#157a21",
    fontSize: 50,
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 20,
  },
  paragraph: {
    width: 400,
    fontSize: 14.5,
  },
  cover: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    height: "72vh",
  },
  coverImg: {
    height: "100%",
  },
  ctaOrder: {
    fontSize: 18,
    backgroundColor: "#f7a692",
    marginTop: 30,
  },

  paragraph2 : {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: -50,
    textAlign: 'center'

  },

  textBelow:{
    marginBottom: '2vh',
    color: 'green'
  },

  '@media only screen and (max-width: 750px)': {
    safeFood:{
      display: 'flex',
      justifyContent: 'center',
      marginRight: '60px',
    },
    delivery:{
      fontSize: 40,
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '-60px'
    },
    delivery2: {
      fontSize: 30,
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '-60px'
    },
    paragraph :{
      display: 'none'
    },
    ctaOrder: {
      display: 'none'
    },
    cover: {
      height:"20vh"
    },
    presentation: {
      minHeight: 'auto'
    },
    introduction: {
      paddingLeft: '50px'
    }
  }

}));


const HomeStart = () => {

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' }) // this is a hook

  const classes = useStyles();
  return (
    <section className={classes.presentation}>
      <div className={classes.introduction}>
        <Typography className={classes.safeFood} noWrap>
          0
        </Typography>
        <Typography className={classes.delivery} noWrap>
          COMMISSION 
          
        </Typography>
        <Typography className={classes.delivery2} noWrap>
          30% moins cher
          
        </Typography>

        <Typography variant="body2" className={classes.paragraph}>
          Nos restaurateurs ador??s ont besoin d'aide, particuli??rement en
          ce moment. C'est pourquoi nous proposons une application b??n??vole:
          nous ne prenons aucune commission pour soutenir la restauration, tout
          en vous proposant un service de livraison de qualit??.
        </Typography>
        {isTabletOrMobile &&
          <Typography variant="body2" className={classes.paragraph2}>
          L'initiative citoyenne pour les restaurateurs ! <br />
          R??galez-vous !
        </Typography>
        }
        
          <Button variant="outlined" className={classes.ctaOrder} onClick={() => window.scrollTo(0,0)}>
          {/* window.innerHeight */}
            COMMANDER
          </Button>
        
      </div>
      <div className={classes.cover}>
        <img src={cover} alt="safe-delivery" className={classes.coverImg} />
      </div>
      {isTabletOrMobile &&
        <Typography variant='body2' className={classes.textBelow}> Rentrez votre addresse pour commander </Typography>
      }
    </section>
  );
};

export default React.memo(HomeStart);
