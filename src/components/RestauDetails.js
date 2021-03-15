import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Modal from 'react-modal';
import CloseButton from '@material-ui/icons/Close';
import ItemCard from './ItemCard';
import InsideModal from './InsideModal'

// style
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';

// import react responsive for the style

import { useMediaQuery } from 'react-responsive'

const useStyles = makeStyles({

    title:{
        display: 'flex',
        justifyContent: 'center'
    },

    content: {
        overflow: "auto",
        minHeigh: 'min-content',
        display: 'flex',
        flexDirection: 'column',
        

    },

    cover: {
       
        width: '100%'
        

    },

    titleItems:{
        display: 'flex',
        fontSize: 20,
        justifyContent: 'center'
    },

    button: {
        fontSize: '30px'
    }

    

    


})

var noScroll = require('no-scroll');


export default function RestauDetails(props) {

    const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' }) // this is a hook

    var finalImageUrl = 'boost'

    if(props.imageUrl){
        const imageUrl = props.imageUrl;
        const imageUrlSplit = imageUrl.split("\\");
        var finalImageUrl = `${process.env.REACT_APP_SERVER_AMAZON}/${imageUrlSplit[0]}`; //3002 - server port
    }
    
    


    useEffect(() => {
        if (open) {
            noScroll.on()
        }

        return () => noScroll.off()
    })

    const classes = useStyles()


    const [open, setOpen] = useState(false)

    return (
        <>
        {role !== "ROLE_SELLER" ? (
        <div onClick={() => { setOpen(true) }} style={{ cursor: 'pointer' }}>
            <ItemCard {...props} />
        </div>
        ):
        <ItemCard {...props} />}
            {!isTabletOrMobile ? 
            <Modal isOpen={open} preventScroll={false} ariaHideApp={false} style={{ overlay: { backgroundColor: 'rgba(38, 38, 38, 0.8)'}, content: {top: '40px', bottom: '40px', left: '30vw', right: '30vw'}}} >
                
                <InsideModal setOpen={setOpen} finalImageUrl={finalImageUrl} options={props}/> 
                
            
            </Modal> 
            :
                <Modal isOpen={open} preventScroll={false} ariaHideApp={false} style={{ overlay: { backgroundColor: 'rgba(38, 38, 38, 0.8)' }, content: { top: '10px', bottom: '10px', left: '10px', right: '10px' } }} >


                <InsideModal setOpen={setOpen} finalImageUrl={finalImageUrl} options={props} follow={false}/> 
                {/* Add many props change by adding a "big props" */}

                </Modal>
            }
            
        </>
    )
}