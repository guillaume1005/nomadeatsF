import React, {useState} from 'react';


import { Dialog, Modal } from "@material-ui/core";
import InsideModal from "./InsideModal";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";


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
        }
    },
    ...theme.spreadThis,
}));


export default function SimpleExpansionPanel(props) {

    const classes = useStyles();


    const {item, totalPrice} = props

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(false)

        console.log(open)
    }


    return(
        <div>

            <Dialog open={open} onClose={handleClick} >

                <InsideModal setOpen={handleClick} finalImageUrl={`${process.env.REACT_APP_SERVER_AMAZON}/${item.item.imageUrl}`} options={item.item} follow={true} />


            </Dialog>



            <button className={classes.buttonAccept} onClick={() => setOpen(true)}>Détails</button>

        </div>


    )
}