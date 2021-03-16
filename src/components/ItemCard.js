import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//m-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";



//custom-hook
import useForm from "../hooks/forms";

import MyButton from "../util/MyButton";
import { deleteItem, editItem } from "../redux/actions/dataActions";
import ItemDialog from "../components/ItemDialog";
import { addToCart } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: 'space-between'
    
  },
  details: {
    display: "flex",
    flexDirection: "column",
    height: '270px' // 150 seem to be really good with the click on the product that goes to the cart
  },
  content: {
    flex: "1 0 auto",
    width: '100px'
  },
  cover: {
    height: "180",
    width: "60%",
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    fontSize: 16
  },
  text: {
    fontSize: 12
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ItemCard(props) {
  const classes = useStyles();
  const { title, imageUrl, description, price, _id, options } = props; // get the props
  // before there was also 'imageUrlSplit[1]', removed now after imageUrlSplit[0]
  // const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}`; //3002 - server port
  // const finalImageUrl = `${process.env.REACT_APP_SERVER_AMAZON}/${imageUrlSplit[0]}`; // 3002 -server port

  var finalImageUrl = 'boost'

  if (props.imageUrl) {
    const imageUrl = props.imageUrl;
    const imageUrlSplit = imageUrl.split("\\");
    var finalImageUrl = `${process.env.REACT_APP_SERVER_AMAZON}/${imageUrlSplit[0]}`; //3002 - server port
  }

  const dispatch = useDispatch();

  const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);
  const { addCartSuccess } = useSelector((state) => state.data);

  

  const [open, setOpen] = useState(false);
  const [openSnackBar, setSnackBar] = useState(false);
  const [image, setImage] = useState(null);
  const [copyOptions, setCopyOptions] = useState(options)



  const onSetCopy = (object) => {
    setCopyOptions(object) // this is the hook
  }


  const { inputs, handleInputChange } = useForm({ // do not get the inputs
    title: "",
    description: "",
    price: "",
  });

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
    
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
    if (image !== null) itemData.append("image", image);
    else itemData.append("image", imageUrl);
    itemData.append("title", inputs.title);
    itemData.append("description", inputs.description);
    itemData.append("price", inputs.price);
    itemData.append("options", JSON.stringify(copyOptions))
    dispatch(editItem(itemData, _id)); // eslint-disable-next-line
    handleClose();
  };
//instanciate the edit on the objects
  const openEdit = () => {
    inputs.title = title;
    inputs.price = price;
    inputs.description = description;
    setOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteItem(_id));
  };


  const handleCart = (options) => {

    // transforming options into
    // [{
    //   category: 'boom'
    //   checked: [1,2,3,2,1]
    // }]
    // insteadof 
    // [{
    //   category: 'boom'
    //   customs: {
    //     selected: []
    //     checked: []
    //     price: []
    //     }
    // }]
    
    const newArray = options;
    const bossArray = []

    console.log(newArray)

    newArray.forEach((element) => {
      bossArray.push({
        'category': element.category,
        'checked': element.customs.checked

      })
    })
    const itemData = {
      itemId: _id, // not only the id, but also the options
      options: JSON.stringify(bossArray)
    };
    dispatch(addToCart(itemData)); //add the object to the cart
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      setSnackBar(false);
      return;
    }

    setSnackBar(false);
  };

  const handleSnackBar = (event, reason) => {
    if (addCartSuccess || addCartSuccess == null) setSnackBar(true);
  };






  return (
    <>
      <Card className={classes.root} variant="outlined">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className={classes.text}>
              {/* nowrap is to put it on one line */}
              {description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className={classes.title}>
              {price}€ <br/>
            </Typography>
          </CardContent>
          {role === "ROLE_SELLER" ? (
            <div style={{ textAlign: "center" }}>
              <MyButton tip="Edit" onClick={openEdit}>
                <EditIcon style={{ color: "green" }} />
              </MyButton>
              <MyButton tip="Delete" onClick={handleDelete}>
                <DeleteIcon style={{ color: "#f44336" }} />
              </MyButton>
            </div>
          ) : authenticated ? (
            <>
            {/* <Button
              color="secondary"
              style={{
                color: "#000",
                width: "60%",
                marginLeft: "20%",
                marginBottom: "10%",
              }}
              onClick={() => {
                handleCart(copyOptions); // the options of the item
                handleSnackBar(); // get the update for the client
              }}
              variant="contained"
            >
              Ajouter
            </Button> */}
            </>
          ) : (
            <>
            {/* This is what it was displayed before */}
            {/* <Link to="/login">
              <Button
                color="secondary"
                style={{
                  color: "#000",
                  width: "60%",
                  marginLeft: "20%",
                  marginBottom: "10%",
                }}
                variant="contained"
              >
                Ajouter
              </Button>
            </Link> */}
            </>
            
          )}
        </div>
        <CardMedia
          className={classes.cover}
          image={finalImageUrl}
          title="Item order"
        />
      </Card>
      <ItemDialog 
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        inputs={inputs}
        handleInputChange={handleInputChange}
        settle={copyOptions}
        title={title}
        onSetCopy={onSetCopy} // hook


      />
      <div className={classes.snackbar}>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3600}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            style={{ backgroundColor: "#157a21" }}
          >
            Item added to cart!
          </Alert>
        </Snackbar>
      </div>

    </>
  );
}
