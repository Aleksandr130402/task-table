import React, { useEffect, useState } from "react"
import { createUseStyles } from 'react-jss';
import { ICartItems } from "./interfeces";

type ShoppingCartTableProps = {
    cartItems : ICartItems[]
    onIncreased : (id: number) => void 
    onDecreased : (id: number) => void   
    onDeleted : (id: number) => void  
    orderTotal : number 
}

const useStyles = createUseStyles({
    total: {
        textAlign: "right",
        fontSize: "1.3rem",
        marginRight: "10px"
    },
    btnHandlers: {
        marginLeft: "5px",
        marginTop: "5px"
    }
})
const ShoppingCartTable: React.FC<ShoppingCartTableProps> = ({cartItems, onIncreased, onDecreased, onDeleted, orderTotal}) => {
    const [itemsInCart, addItems] = useState<ICartItems[]>([]);
    useEffect(() => {
        addItems(cartItems)
    }, [cartItems]);

    const classes = useStyles();

    let total;

    if( orderTotal ) {
        total = <div className={classes.total}>
        Всього: {orderTotal} &#8372;</div>
    }

    const renderRow = (item: ICartItems, idx: number) => {
        return (
            <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.title}</td>
                <td>{item.count}</td>
                <td>{item.total} &#8372;</td>
                <td>
                    <button className={`btn btn-outline-success ${classes.btnHandlers}`}
                onClick={() => onIncreased(item.id)}>
                        <i className="fa fa-plus-circle"/>
                    </button>
                    <button className={`btn btn-outline-warning ${classes.btnHandlers}`}
                onClick={() => onDecreased(item.id)}>
                        <i className="fa fa-minus-circle"/>
                    </button>
                    <button className={`btn btn-outline-danger ${classes.btnHandlers}`}
                onClick={() => onDeleted(item.id)}>
                        <i className="fa fa-trash"/>
                    </button>
                </td>
            </tr> 
        )
    };

    return (
        <div>
            <h2>Кошик</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Товар</th>
                        <th>Кількість</th>
                        <th>Ціна</th>
                    </tr>                
                </thead>
                <tbody>
                    {           
                    itemsInCart.map(renderRow)     
                    }               
                </tbody>
            </table>
            { total }
        </div>
    )
}

export default ShoppingCartTable;