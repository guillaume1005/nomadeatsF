import React, {useState} from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


// add icon
import AddButtonCircle from '@material-ui/icons/AddCircle'
import AddButton from '@material-ui/icons/Add'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import Switch from "./Switch";


const useStyles = makeStyles((theme) => ({ 
  
  button: {
    backgroundColor: "transparent",
    border: "transparent",
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '20px',
    marginTop: '20px'
  },

  option: {
    backgroundColor: "transparent",
    border: "transparent",
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '15px',
    marginLeft: '50px',
    marginTop: '10px'
  },

  margin: {
    margin: theme.spacing(3),
    marginLeft: '20vw'
  },

  switch: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '50px'
  },
  
  availability: {
    marginRight: '30px'
  }


}));



export default function SellerDashboard(props) {
  const classes = useStyles();
  const {
    open,
    handleClose,
    handleSubmit,
    inputs,
    handleInputChange,
    handleFileSelect,
    settle,
    onSetCopy,
    available1,
    setAvailable
    } = props;
  

  
  // test
 

  const [category, setCategory] = useState({})

  
  const handleToggle = () => {
    setCategory({
      'boss': 'boss'
    })

    console.log(available1)
    // update of newArray
    setAvailable(!available1)


  }





  const onHandleChange = (event, item) => {
    
    event.persist()
    
    setCategory({
      'item':'boss'
    })
    // once category is changed, we change also the category of the real object

    //create the object by copying real object

    var newArray = settle;
    newArray.forEach((element)=> {
      if(element === item){
        return element.category = event.target.value
      }
    })

    // change the state after settings on the copy object
    onSetCopy(newArray)

    console.log(settle)



  }


  const onHandleCustom = (event, boss, item, count) => {
    // we can use an object to change after the values 
    event.persist()


    setCategory({
      'item': 'boss'
    })

    // now we change the object by changing and saying it is not an array anymore
    var bigArray = settle;
    bigArray.forEach((element) => {
      if (element === item) {
        element.customs.selected.forEach((bam) => {

          element.customs.selected[count] = event.target.value
          element.customs.checked[count] = false
          
          
        })
      }
    })


    // change the state after settings on the copy object

    onSetCopy(bigArray)
    




  }


  ////////////////////////////////////////// CATEGORY ADDED ////////////////////////////////////


  const handleOptionAdd = (item) => {
    setCategory({
      'bim': 'bam'
    })


    var bigArray = settle;

    //loop in the entire bigArray
    
    bigArray.forEach((element)=> {

      if(element===item){
        console.log('jackpot')
        element.customs.selected.push('')
        element.customs.checked.push(false)
      }
    }
    )




  
    // change the state after settings on the copy object
    onSetCopy(bigArray)


  }


  const handleCategoryAdd = () => {
    // idee of returning the same object

    
    setCategory({
      'bim': 'bam'
    })

    var bigArray = settle;
    
    bigArray.push({
      'category': '',
      'customs': {
        'checked': [''],
        'selected': ['']

      }
    })
    




    // change the state after settings on the copy object
    onSetCopy(bigArray)





  }





  const { errors } = useSelector((state) => state.UI);
  
  

  const { message, errors: errorsItem } = errors || {};

  

  let imageError;
  let titleError;
  let descError;
  let priceError;

  if (message) {
    if (message.includes("Upload an image")) imageError = message;
  }

  if (errorsItem) {
    for (let error of errorsItem) {
      // looping through the id
      if (error.msg.includes("Title needs to be")) titleError = error.msg;
      if (error.msg.includes("Description cannot")) descError = error.msg;
      if (error.msg.includes("Price cannot")) priceError = error.msg;
    }
  }

  const handleChangeAmount = (event, index, number) => {

    // creating new object to remplace

    setCategory({
      'bim': 'bam'
    })
    const newArray = settle;

    // already have the index


    if (newArray[index].customs.price){
      newArray[index].customs.price[number] = event.target.value
    }

    else {
      newArray[index].customs.price = [event.target.value]
    }


    onSetCopy(newArray)


  }


  const renderTextField = () => {
    return (
      settle &&

      settle.map((item, index) => (





        <>

          {/* This is rerendered each time before */}
          {/* precision[0].map((item) => ( */}



          <TextField
            // value={title.category}
            name={`category${item}`}
            key={index}
            label="Catégorie"
            placeholder="Sauce, Sandwich..."
            value={item.category}
            style={{ marginLeft: '30px' }}
            onChange={(event) => onHandleChange(event, item)}
            helperText={titleError}
            error={titleError ? true : false}
            fullWidth
          />
          <div className={classes.option} onClick={() => handleOptionAdd(item)} >
            <AddButton /> Ajouter une nouvelle option
              </div>


          { item.customs &&

            item.customs.selected.map((boss, number) => (
            <>
              {/* Have a number */}
              {/* precision[1][item].options.map((boss)=>( */}


              {/* The hooks works if they are linked with a setState */}

              {/* Change the value of boss with onHandleCustom */}

              <TextField
                // value={title.customs}
                key={number}
                name={`option${item}${boss}`}
                label="Option"
                value={boss}
                placeholder="Barbecue, Ketchup..."
                style={{ marginLeft: '50px', fontSize: '15px' }}
                onChange={(event) => onHandleCustom(event, boss, item, item.customs.selected.indexOf(boss))}
                helperText={titleError}
                error={titleError ? true : false}
                fullWidth
              />

            <FormControl  className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Prix Supplément</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={item.customs.price ? item.customs.price[number]: ''}
                onChange={(event)=>handleChangeAmount(event, index, number)}
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                labelWidth={60}
                type='number'
              />
            </FormControl>
            </>
          ))}
        </>

      ))

          
    )
  }



  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" style={{width:'100%'}}>
    {/* Before maxwWdith='sm' */}
      <DialogTitle>Détails</DialogTitle>
      <div className={classes.switch}>
        <Typography className={classes.availability}>Disponible Aujourd'hui ?</Typography>
        <Switch isToggled={available1} onToggle={() => handleToggle()} />
      </div>
      <DialogContent>
        <form>
          <TextField
            name="title"
            label="Nom du Plat"
            placeholder="Nom du Plat"
            className={classes.textField}
            value={inputs.title}
            onChange={handleInputChange}
            helperText={titleError}
            error={titleError ? true : false}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            placeholder="Spicy, non-veg, Basil leaves" // no components with index, directly mapping components, and properties state in it
            className={classes.textField}
            value={inputs.description}
            onChange={handleInputChange}
            helperText={descError}
            error={descError ? true : false}
            fullWidth
          />
          <TextField
            name="price"
            label="Prix"
            placeholder="Prix du Plat"
            className={classes.textField}
            type="number"
            value={inputs.price}
            onChange={handleInputChange}
            helperText={priceError}
            error={priceError ? true : false}
            fullWidth
          />

          
          
          {/* <div className={classes.button} onClick={() => setPrecision([ // update the number of items
          precision[0]=[...precision[0], precision[0][precision[0].length-1]+1],
          precision[1]= [...precision[1], {options: [0], number: precision[0].length}]])} >
            <AddButtonCircle /> Ajouter des précisions
          </div> */}

          <div className={classes.button} onClick={handleCategoryAdd} >
            <AddButtonCircle /> Ajouter des précisions
          </div>


          {renderTextField()}
          
          
          
          
          
          <Typography
            variant="body2"
            component="p"
            style={{ margin: "10px 10px 2px 10px" }}
          >
            Sélectionnez une image:
          </Typography>
          <input
            accept="image/*"
            className={classes.uploadImages}
            id="raised-button-file"
            type="file"
            onChange={handleFileSelect}
          />
          {imageError && (
            <Typography
              variant="body2"
              component="p"
              style={{ margin: "4px 10px 2px 10px", color: "#f44336" }}
            >
              Upload an Image as well
            </Typography>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#c70f02" }}>
        <>
        {/* This is how we get the hooks with the callback */}
          Annuler
        </>
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
