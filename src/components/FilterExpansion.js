import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Dialog, Modal } from "@material-ui/core";
import InsideModal from "./InsideModal";

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
  const [open, setOpen] = useState(false)

  let items;
  let totalPrice = 0;
  const finalImageUrl = '//'
  if (props.condition === "Orders") {
    items = props.items;
    items.forEach((item) => {
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

  const handleClick = () => {

    setOpen(true)
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
              {items.map((item, index) => {

                const imageUrl = item.item.imageUrl;
                const imageUrlSplit = imageUrl.split("\\");
                const finalImageUrl = `${process.env.REACT_APP_SERVER_AMAZON}/${imageUrlSplit[0]}`; //3002 - server port


                return (
                  <>
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

                  <Dialog key={index+1} open={open} >

                    <InsideModal key={index+2} setOpen={setOpen} finalImageUrl={finalImageUrl} options={item.item} follow={true} />


                  </Dialog>
                </>
                );

              })}
              <Typography variant="h5" className={classes.heading}>
                Total - {totalPrice} €
              </Typography>
              <button className={classes.buttonAccept} onClick={()=>handleClick()}>Détails</button>
                

            
            </>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>

      
    
    </>
  );
}
