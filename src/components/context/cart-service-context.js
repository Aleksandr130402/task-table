import React from "react";

const {
    Provider: CartServiceProvider,
    Consumer: CartServiceConsumer
} = React.createContext();

export {
    CartServiceProvider,
    CartServiceConsumer
};