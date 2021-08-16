import React from "react";
import { CartServiceConsumer } from "../context/cart-service-context";

const withCartService = () => (Wrapped) => {
    return (props) => {
        return (
            <CartServiceConsumer>
                {
                    (cartItems) => {
                        return (<Wrapped {...props}
                        cartItems={cartItems}/>);
                    }
                }
            </CartServiceConsumer>
        )
    }
}

export default withCartService;