import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import openSocket from "socket.io-client";

import { getOrders, socketStatusUpdate } from "../redux/actions/dataActions";
import OrderCard from "../components/OrderCard";

//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "10px 0px 10px 130px",
    display: "inline-block",
    marginRight: "40%",
  },
}));

const Orders = (props) => {
  const dispatch = useDispatch(); // function that updates the memory
  const { orders } = useSelector((state) => state.data); // get data, hook maybe
  const {
    account: { role },
    _id,
  } = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getOrders()); // at the beginning it executes this
    const socket = openSocket(process.env.REACT_APP_SERVER_URL);
    socket.emit("add-user", { userId: _id }); // open a socket between user and server
    socket.on("orders", (data) => {
      if (data.action === "update") {
        dispatch(socketStatusUpdate(data.order));
      }
      if (data.action === "create") {
        dispatch(getOrders());
        dispatch(getOrders());
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Historique des commandes
      </Typography>
      <Grid item container direction="row">
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10}>
          <Grid container spacing={2}>
            {orders ? (
              orders.length > 0 ? (
                orders.map((order) => (
                  <Grid item xs={12} sm={4} key={order._id}>
                    <OrderCard order={order} role={role} />
                    {/* Get the list of items for the payment */}
                  </Grid>
                ))
              ) : (
                <p className={classes.para}>No Orders present.</p>
              )
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={1} />
      </Grid>
    </>
  );
};

export default Orders;
