import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Infos from './Infos'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  buttonAccept: {
    backgroundColor: "#118a27",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    }},
  ...theme.spreadThis,
}));

export default function SimpleExpansionPanel(props) {


  const classes = useStyles();


  // const [imageList, setImageList] = useState([]);
  // const [itemList, setItemList] = useState([])


  let items;
  let array = [];
  let totalPrice = 0;
  const finalImageUrl = '//'
  if (props.condition === "Orders") {
    items = props.items;
    items.forEach((item) => {
      array.push(false)
      totalPrice = totalPrice + item.quantity * item.item.price; // the item contains the itemId like
      // item is the object containing the item props cause items is array [{item: ''}]
      item.item.options.forEach((cat)=>{
        //loop on the checked
        cat.customs.checked.forEach((check, index)=>{
          if(check){
            totalPrice = totalPrice + cat.customs.price[index] // times the quantity also
          }
        })
      })
    });
  }
  
  

  return (
    <>
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.backgroundColorChange}
        >
          <Typography className={classes.heading}>
            {props.condition === "Orders" && "Ordre de Commande"}
            {/* before it was "Order Summary" */}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{ display: "flex", flexDirection: "column" }}
        >
          {props.condition === "Orders" && (
            <>
              {items.map((item, index) => 


                
                  <>
                  {/* another return before items */}
                  {/* Dans les maps il y a des returns */}
                  <Typography
                    key={index}
                    variant="body2"
                    color="textPrimary"
                    key={item.item._id}
                  >
                    <div key={index+4} className={classes.spaceTypo}>
                      <span key={index+5}>{item.item.title}</span> 
                      {/* The item.item.title is what we want */}
                      <span key={index+6}>
                        
                        {item.item.price} x {item.quantity}
                        
                      </span>
                    </div>
                    <br />
                  </Typography>

                  {/* Component unique */}

                  <Infos key={index} item={item} />


                </>

               
                

              )}
            <Typography variant="h5" className={classes.heading}>
              Total Avec Livraison- {totalPrice} €
            </Typography>

                

            
            </>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>

      
    
    </>
  );
}
