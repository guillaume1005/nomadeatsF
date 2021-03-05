import React from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";



// to make style

const useStyles = makeStyles((theme) => ({
    
    checkoutButton: {
        backgroundColor: "#1266f1",
        color: "white",
        marginBottom: 20,
        marginTop: 40,
        "&:hover": {
            backgroundColor: "#5a5c5a",
        },
        "&:disabled": {
            color: "#bfbfbf",
        },
    },
}));





const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: '16px',
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883"},
            "::placeholder": { color: "#87bbfd"}
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm(props) {
    const stripe = useStripe()
    const elements = useElements()
    const classes = useStyles(); // the hooks are used inside of a react component


    const handleSubmit = async(e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            // this is where we put the payment

            type: "card",
            card: elements.getElement(CardElement)

        })
    

    if(!error) {
        try {
            // we can put this in the submit
            const {id} = paymentMethod
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}:3002/payment`, // this is where we catch the error
            {

                amount: props.price,
                id

            })

            if(response.data.success){
                console.log('Successful payment')
                props.order()
            }
                
        }
        catch (error) {

            console.log('Error', error)

        }
    }

    else {
        console.log(error.message)
    }
}

    return (
        // <>
        // {!success ?
        // <form onSubmit={handleSubmit}>
        //     <fieldset className="FormGroup">
        //         <div className="FormRow">
        //             <CardElement options = {CARD_OPTIONS} />
        //         </div>
        //     </fieldset>
        // </form>
        // :
        // <div>
        //     <h2> You just bought a sweet spatula congrats this is a the best decision of your life</h2>
        // </div>
        // }

        // </>
        <>
            
                <div>
                    {/* <form onSubmit={handleSubmit}> */}

                    <CardElement options={CARD_OPTIONS} />

                    {/* <input type="submit" value="Submit"></input> */}
                    <Button
                        fullWidth
                        className={classes.checkoutButton}
                        onClick={handleSubmit}
                    >
                        Je mange !!
             </Button>

                    {/* </form> */}
                </div>
                
                
            

        </>
    )
}