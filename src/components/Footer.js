import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#e8ede1",
    marginTop: 40,
    height: "42vh",
    textAlign: "center",
  },
  innerCont: {
    margin: "74px 40px 40px 40px",
  },
  resources: {
    margin: "60px 40px 10px 40px",
  },
  buttonStyleOne: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  buttonStyleTwo: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginLeft: 10,
    marginTop: 8,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

export default function Footer() {
  const { authenticated } = useSelector((state) => state.auth);
  const classes = useStyles();
  return (
    <Grid container direction="row" className={classes.container}>
      <Grid item xs={12} sm={4} className={classes.innerCont}>
        {authenticated ? (
          <Grid container direction="row">
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="p">
                Entreprise
              </Typography>
              <Typography variant="body1" component="p">
                <br />
                - À propos <br />
                - Blog <br />
                - Équipe <br />
                - Service Client <br />
                - Reporter une fraude <br />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="p">
                Pour Vous
              </Typography>
              <Typography variant="body1" component="p">
                <br />
                - Données privées <br />
                - Termes <br />
                - Securité <br />
                - Nos engagements <br />
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography variant="h4" component="p">
              NomadEats Business (Restaurants et Livreurs)
            </Typography>
            <Typography variant="body1" component="p">
              Développez votre commerce, sans aucune commission, sans perdre de vue ce qui est le plus important - régaler vos clients
            </Typography>
            <br />
            <Link to="/addrestaurant">
              <Button className={classes.buttonStyleOne}>Ça part</Button>
            </Link>
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={3} className={classes.innerCont}>
        <Typography variant="h5" component="p">
          NomadEats NewsLetter
        </Typography>
        <Typography variant="body1" component="p" style={{ marginBottom: 28 }}>
          Restez à l'affut d'un an de nourriture offerte !
        </Typography>
        <TextField label="Votre adresse Email" variant="outlined" />
        <Button className={classes.buttonStyleTwo}>J'en suis !</Button>
      </Grid>
      {/* <Grid item xs={12} sm={3} className={classes.resources}>
        <Typography variant="h5" component="p">
          Resources/Stack Used
        </Typography>
        <Typography variant="body1" component="p" style={{ marginBottom: 28 }}>
          - React Material UI Redux
          <br />
          - NodeJs <br />
          - Express <br />
          - MongoDB Atlas <br />
          - Zomato <br />
          - Freepik <br />
        </Typography>
      </Grid> */}
    </Grid>
  );
}
