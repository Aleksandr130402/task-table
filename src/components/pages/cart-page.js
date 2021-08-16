import React from 'react'
import ShoppingCartTable from '../shopping-cart-table';

const CartPage = ({cartItems, onIncreased, onDecreased, onDeleted, orderTotal}) => {
    return <ShoppingCartTable 
            cartItems={cartItems} 
            onIncreased={(id) => onIncreased(id)} 
            onDecreased={(id) => onDecreased(id)} 
            onDeleted={(id) => onDeleted(id)}
            orderTotal={orderTotal}
            />
}

export default CartPage;