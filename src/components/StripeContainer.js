import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_51HHCTMBWPXulgb7IwjIrvAcomucbus9D7UQNcHPCaDYprvj6t7a5cTo6q1iuW9KxF4cbDnvZYPBeH6DZUUjSqqlI001M5ABV64";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {

    return(
        <Elements stripe={stripeTestPromise}>
            <PaymentForm price={props.price} order={props.place} />
        </Elements>
    )
}