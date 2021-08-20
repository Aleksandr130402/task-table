import React from 'react'
import ShoppingCartTable from '../shopping-cart-table';
import { ICartItems } from "../interfeces";

type CartPageProps = {
    cartItems : ICartItems[]
    onIncreased : (id: number) => void 
    onDecreased : (id: number) => void   
    onDeleted : (id: number) => void  
    orderTotal : number 
}

const CartPage: React.FC<CartPageProps> = ({cartItems, onIncreased, onDecreased, onDeleted, orderTotal}) => {
    return <ShoppingCartTable 
            cartItems={cartItems} 
            onIncreased={(id) => onIncreased(id)} 
            onDecreased={(id) => onDecreased(id)} 
            onDeleted={(id) => onDeleted(id)}
            orderTotal={orderTotal}
            />
}

export default CartPage;