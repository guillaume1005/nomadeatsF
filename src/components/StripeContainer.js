import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_51IVHlCC6HkxNhQHqxDV0njnvQGcRGmoAvjsKgtBiHlFAXeDoUHV7maGY4oAbQz6uZrXPKIDRoPng1EeSsx112Glj00BaiyQ9W8";
// const PUBLIC_KEY = "pk_live_51IVHlCC6HkxNhQHqIl0D17OAkBdlT710DaO5TAwZE8NuOJvaVmn0Z6VAftScWxQLztR3AfYQG6OEnu3xybUXYWdK00ee1k14gA";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {

    return(
        <Elements stripe={stripeTestPromise}>
            <PaymentForm cart={props.cart} order={props.place} />
        </Elements>
    )
}