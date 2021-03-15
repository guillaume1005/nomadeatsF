import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_live_51HHCTMBWPXulgb7IBw1sJhh3zIHaQuWrIjMTPQixzzj5UvHpzb7QBv1UfXiNKtBEG37epNRncR311z1Ys2Cvj3Af00RZEK0SZ1";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {

    return(
        <Elements stripe={stripeTestPromise}>
            <PaymentForm cart={props.cart} order={props.place} />
        </Elements>
    )
}