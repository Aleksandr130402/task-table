import React from "react";
import { createUseStyles } from 'react-jss';
import { Link } from "react-router-dom";

type ShopHeaderProps = {
    numItems: number,
    total: number
}

const useStyles = createUseStyles({
    shopHeader: {
        borderBottom: "1px solid #e5e5e5",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between"
    },
    logo: {
        fontFamily: "Roboto, sans-serif",
        fontSize: "1.5rem",
        paddingLeft: "1rem",
    },
    shoppingCart: {
        alignSelf: "center",
        fontSize: "1.3rem",
        paddingRight: "1rem"
    },
    cartIcon: {
        fontSize: "1rem",
        color: "cadetblue",
        marginRight: "10px"
    }
})

const ShopHeader: React.FC<ShopHeaderProps> = ({numItems, total}): JSX.Element => {
    const classes = useStyles();

    return (
        <header className={`${classes.shopHeader}`}>
            <Link to="/">
                <div className={`${classes.logo} text-dark`}>Store</div>
            </Link>
            <Link to="/cart">
            <div className={classes.shoppingCart}>
                <i className={`fa fa-shopping-cart ${classes.cartIcon}`}/>
                {numItems} items {total}
            </div>              
            </Link>
        </header>
    )
}

export default ShopHeader;