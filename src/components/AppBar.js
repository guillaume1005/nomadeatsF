import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";


//material-ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { logoutAction } from "../redux/actions/authActions";
import { Link } from "react-router-dom";

// import react responsive for the style

import { useMediaQuery } from 'react-responsive'
// use only classes for the style


const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "#e8ede1",
    marginBottom: 10,
  },
  title: { flex: 1, marginLeft: 60, color: "black" },
  buttonStyles: {
    color: "black",
    margin: "0 6px 0",
    display: "inline-block",
  },

  buttonStyles2: {
    color: "black",
    margin: "0 6px 0",
    display: "inline-block",
  },

  buttonStyles3: {
    color: "black",
    margin: "0 6px 0",
    display: "inline-block",
  },

  buttonStyle: {
    color: "black",
    backgroundColor: "green",
    marginRight: '0',
  },
  buttons: {
    marginRight: 60,
  },
  name: {
    fontStyle: "bold",
    fontSize: 32,
  },

  '@media only screen and (max-width: 750px)': {

    name : {
      fontSize: 14,
      color: "blue"
    },

    title: {
      marginLeft: 0
      // THIS allows to put the title at the left for phones
    },

    buttonStyles2:{
      fontSize: '11px',

    },

    buttonStyles3: {
      fontSize: '11px',
      marginRight: -40
    }


    
  }

  
}));

export default function AppBarPrimary() {


  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' }) // this is a hook
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    account: { role },
    authenticated,
    firstName,
    lastName,
    address,
  } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction(history));
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.title}>
          <Typography variant="h6" noWrap>
            <span className={classes.name}>NomadEats</span>
          </Typography>
        </Link>
        {authenticated ? (
          role === "ROLE_SELLER" ? (
            <div className={classes.buttons}>
            {/* what is seen for the vandor */}
              {/* <Typography className={classes.buttonStyles2}>
                Table de Bord
              </Typography> */}
              
                <Link to="/seller/orders">
                  {/* Here we link it to the path "/seller/orders" */}
                  <Button className={classes.buttonStyles2}>Mes Commandes</Button>
                </Link>
              
              
              <Button
                onClick={handleLogout}
                className={classes.buttonStyles3}
                variant="outlined"
              >
                Deconnexion
              </Button>
            </div>
          ) : (!isTabletOrMobile ? (
            
            <div className={classes.buttons}>
              <Typography className={classes.buttonStyles}>
                Coucou, {firstName} {lastName}
              </Typography>
                {/* If it is a computer, display this */}
              <Link to="/orders">
                <Button className={classes.buttonStyles}>Commandes</Button>
              </Link>
              <Link to={{ pathname: "/cart", state: { address: address } }}>
                <Button className={classes.buttonStyles}>Panier</Button>                
              </Link>
              <Button
                onClick={handleLogout}
                className={classes.buttonStyles}
                variant="outlined"
              >
                Je pars
              </Button>
            </div>
          )
          :(
            <>
              {/* otherwise display logout */}
              <Link to={{ pathname: "/cart", state: { address: address } }}>
                <Button className={classes.buttonStyles}>Panier</Button>                
              </Link>

                  
                  <Button
                    onClick={handleLogout}
                    className={classes.buttonStyles}
                    variant="outlined"
                  >
                    Je pars
              </Button>
            </>
          )
          )
        ) : (
          <div className={classes.buttons}>
            {!isTabletOrMobile ?
            (
              <>
              {/* display this if it is a computer */}
              <Link to="/login">
              <Button className={classes.buttonStyles}>Se Connecter</Button>
            </Link>
            <Link to="/register">
              <Button className={classes.buttonStyles} variant="outlined">
                      S'inscrire
              </Button>
              {/*    Only seen if it is a tablet or mobile    */}
              
            </Link>
            </>
            )
            :
            (
                  <>
                    {/* Here we have two links one inside the other, isue */}
                    <Link to="/login">
                      <Button style={{ marginRight: -50 }} className={classes.buttonStyle}>Se Connecter</Button>
                    </Link>
                  </>
            )}
            
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
