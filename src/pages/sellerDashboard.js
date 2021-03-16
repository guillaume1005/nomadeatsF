import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//custom-hook
import useForm from "../hooks/forms";

import ItemDialog from "../components/ItemDialog";
import RestaurantInfo from "../components/RestaurantInfo";
import RestaurantItems from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";
import { addItem } from "../redux/actions/dataActions";
import { changeSmsStatus } from "../redux/actions/dataActions"
//switch
import Switch from "../components/Switch";


const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "40%",
    margin: "40px 0 0 30%",
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  switch: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text: {
    marginTop: 8,
    marginRight: '40px',
    fontSize: 14,
    color: 'blue'
  },

}));

export default function SellerDashboard() {
  const classes = useStyles();
  const sellerData = useSelector((state) => state.auth); // 
  const { items, sms } = sellerData; // access the variable from this, only take the items
  const dispatch = useDispatch();


  const [copyOptions, setCopyOptions] = useState(items)

  const onSetCopy = (object) => {
    setCopyOptions(object)
  }

  useEffect(() => {
    if (items) { // only get in if items
      setItemsState(items);
      setFilteredItemsState(items);
    }
  }, [items]); // allows to update the items of the restaurant

  const [itemsState, setItemsState] = useState(items ? [] : null);
  const [filteredItemsState, setFilteredItemsState] = useState(
    items ? [] : null
  );
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const { inputs, handleInputChange } = useForm({
    title: "",
    description: "",
    price: "",
  });
  


  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    inputs.title = "";
    inputs.description = "";
    inputs.price = "";
    setImage(null);
    setOpen(false);
  };

  const handleSubmit = () => {
      const itemData = new FormData();
      itemData.append("image", image);
      itemData.append("title", inputs.title);
      itemData.append("description", inputs.description);
      itemData.append("price", inputs.price);
      itemData.append("options", JSON.stringify(copyOptions))
      dispatch(addItem(itemData)); // eslint-disable-next-line
      handleClose();
    
  };

  const handleSearch = (value) => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (value !== "") {
      // Assign the original list to currentList
      currentList = itemsState;

      newList = currentList.filter((item) => {
        const lc = item.title.toLowerCase();
        const filter = value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = itemsState;
    }
    // Set the filtered state based on what our rules added to newList
    setFilteredItemsState(newList);
  };

  //switch
  // const [isToggled, setIsToggled] = useState(sms);

  const handleToggle = () => {
    // const boss = !isToggled, immmediate change for sending
    
    
    var objectSms = {
      'sms': !sms
    }
    
    dispatch(changeSmsStatus(objectSms))
    // setIsToggled(!isToggled);
  }

  console.log(sms)

  // props can change by the server and with useDispatch


  return (
    <>
    <div className={classes.switch}>
        <Typography
          gutterBottom
          variant="h8"
          className={classes.text}>Commandes listées par sms ?</Typography>
        <Switch isToggled={sms} onToggle={() => handleToggle()} />
    </div>
      <RestaurantInfo {...sellerData} />
      <Grid container direction="row" style={{ marginTop: 40 }}>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={6}>
          <Typography
            gutterBottom
            variant="h5"
            style={{ textAlign: "center", marginBottom: 30 }}
            noWrap
          >
            Éditez les plats du Restaurant &nbsp;&nbsp;
            <span role="img" aria-label="burger" style={{ fontSize: 40 }}>
              🍜
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar page="items" handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} sm={1} />
        <RestaurantItems items={filteredItemsState} />
        {/* This allows to filter all the items in the restaurant */}
      </Grid>
      <Button fullWidth className={classes.button} onClick={handleOpen}>
        Ajoutez un plat
      </Button>
      <ItemDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        inputs={inputs}
        handleInputChange={handleInputChange}
        onSetCopy={onSetCopy}
        settle={copyOptions}
      />
    </>
  );
}
