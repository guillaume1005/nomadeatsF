import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';


// style
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import CloseButton from '@material-ui/icons/Close';

// custom hook
import { addToCart } from "../redux/actions/dataActions";

//m-ui

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";




import './style.css'



// import react responsive for the style

import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom';

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
    },

    options: {
        display: 'flex',
        left: 0,
        position :'relative',
        fontSize: '15'
    },

    checkbox:{
        marginRight: '20px'
    },

    rightClass:{
        position: 'relative',
        margin: 10,
        color: 'green'
    },
    bande:{
        width:'100%',
        background: "lightgray"
    }


})
var noScroll = require('no-scroll');


export default function InsideModal(props){

    const {
        authenticated,
        account: { role },
    } = useSelector((state) => state.auth);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const { setOpen, finalImageUrl, options, follow } = props

    const _id = options._id


    const dispatch = useDispatch();

    const [openSnackBar, setSnackBar] = useState(false);

    const { addCartSuccess } = useSelector((state) => state.data);




    const handleCart = (event) => {

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

        const newArray = event.options;
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
    


    const [boolean, setBoolean] = useState(false)


    const handleChangeCheck = (item, boss, event) => {

        setBoolean(!boolean)
        const newArray = copySettle;

        console.log(newArray)

        newArray.options.forEach((element) => {
            if( element ===item){

                element.customs.selected.forEach((nameOption)=>{
                if(nameOption===boss){
                    element.customs.checked[element.customs.selected.indexOf(nameOption)] = event.target.checked
                }
            })
            }
            
        })

        setCopySettle(newArray) // does not see the change ? Because it is the same name ?

    }







    const [copySettle, setCopySettle] = useState(options) 

    const classes = useStyles()
 
    const renderTextField = () => {


        return(

           copySettle.options.map((item) => (





        <>

          {/* This is rerendered each time before */}
          {/* precision[0].map((item) => ( */}

        <div className={classes.bande}>
        <center>
          <h1 className={classes.h1}>{item.category}
        

            
          
          </h1>
        </center>

        </div>
          


          {item.customs.selected.map((boss, number) => (
            <>

                {/* precision[1][item].options.map((boss)=>( */}


                {/* The hooks works if they are linked with a setState */}

                {/* Change the value of boss with onHandleCustom */}
                <div className="page__toggle">
                    <label className="toggle">
                    <input className="toggle__input" type="checkbox" checked={item.customs.checked[item.customs.selected.indexOf(boss)]} onChange={!follow ? (event)=>handleChangeCheck(item, boss, event): ()=>{}} />
                    <span className="toggle__label">
                    <span className="toggle__text">{boss}</span>
                    
                    </span>
                    </label>
                </div>
                  <div className={classes.rightClass}> {item.customs.price[number] ? (
                  
                <div> + {item.customs.price[number] }€</div>)
                    :''}
                   
                </div>

                

            </>
            
          ))}
        </>

      ))

    )
    }

    return(
        <>

        <div className={classes.content}>

            <div onClick={() => { setOpen(false) }} style={{ cursor: 'pointer', position: 'fixed' }}>
                <CloseButton />
            </div>
            
            <img src={finalImageUrl} className={classes.cover} alt=''/>




            
            
            
            {renderTextField()}
            
            

        

           
                
                
                

        </div>
        {role === "ROLE_SELLER" ? (
            <>
            </>

        ):authenticated ? (
        <>
        <Button
            color="secondary"
            style={{
                color: "#000",
                width: "100%",
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '20px'
            }}
            // onClick={() => {
            //     handleCart();
            //     handleSnackBar();
            //     showUpPrecisions();
            // }}
            onClick={() => {
                handleCart(copySettle); // the options of the item
                handleSnackBar(); // get the update for the client
            }}
            variant="contained"
        >
            Ajouter
        </Button>
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
                    Plat ajouté au panier !
        </Alert>
            </Snackbar>
        </div>
        
        </>
        ):
        <Link to='/login'>
        <Button
                        color="secondary"
                        style={{
                            color: "#000",
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '20px'
                        }}
                        // onClick={() => {
                        //     handleCart();
                        //     handleSnackBar();
                        //     showUpPrecisions();
                        // }}
                        onClick={() => {
                            handleCart(copySettle); // the options of the item
                            handleSnackBar(); // get the update for the client
                        }}
                        variant="contained"
                    >
                        Ajouter
        </Button>
        </Link>

        }
        </>



    )
}
   