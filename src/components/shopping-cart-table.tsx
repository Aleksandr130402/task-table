import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
    cartTop: `
        padding: 0 32px 0 32px;
        margin-bottom: 32px;
    `,
    total: {
        zIndex: 1,
        marginTop: "auto",
        padding: "32px",
        "& button": `
            padding: 0;
            width: 100%;
            border-style: none;
            background-color: #23be20;
            color: #fff;
            min-height: 40px;
            border-radius: 4px;
        `
    },
    totalPrice: `
        margin-bottom: 24px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    totalPriceLabel: `
        fontSize: 1.3rem;
    `,
    specialPrice: `
        fontSize: 1.3rem;
    `,
    btnHandlers: {
        marginLeft: "5px",
        marginTop: "5px"
    },
    productActions: {
        gridArea: "actions",
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",
        "& button": {
            border: "none",
            backgroundColor: "rgba(0,0,0,0)"
        },
        "& i": `
            padding: 4px;
        `,
        "& i:first-child": `
            margin-right: 6px;
        `
    },
    productImage: {
        gridArea: "image",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "88px",
        height: "88px",
        fontStyle: "normal",
        marginRight: "16px",
        "& img": `
            display: block;
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
        `
    },
    productTitle: `
        display: block;
        font-family: DIN Pro;
        font-size: 15px;
        line-height: 18px;
        color: #1A1919;
        padding-right: 20px;
    `,
    productQty: {
        marginRight: "8px",
        backgroundColor: "#FFF",
        display: "inline-flex",
        "& input": `
            width: 40px;
            text-align: center;
            padding: 3px;
            border: none;
            height: 30px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background: #ffffff;
            font-family: DIN Pro;
            font-style: normal;
            font-size: 12px;
            line-height: 13px;
            border: 1px solid #E0E0E0;
        `,
        "& #minus": `
            border-radius: 4px 0 0 4px;
        `,
        "& #plus": `
            border-radius: 0 4px 4px 0;
        `
    },
    disabled: `
        border: 1px solid #E0E0E0;
        pointer-events: none;
    `,
    active: {
        background: "#23BE20",
        border: "none"
    },
    productPrice: `
        font-weight: 600;
        font-family: DIN Pro;
        font-style: normal;
        font-size: 24px;
        line-height: 24px;
        color: #1a1919;
    `,
    productBottom: `
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        grid-area: bottom-info;
    `,
    product: `
        padding: 15px 12px 15px 15px;
        display: grid;
        grid-row-gap: 8px;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto auto;
        grid-template-areas:
            "image top-info actions"
            "image bottom-info actions";
        align-items: flex-start;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        margin-bottom: 1rem;
    `,
    products: `
        padding: 0 32px;
    `,
    more: {
        display: "none"
    },
    "@media (max-width: 768px)": {
        productActions: {
            display: "none"
        },
        more: {
            display: "block"
        }
    }
})
const ShoppingCartTable: React.FC<ShoppingCartTableProps> = ({cartItems, onIncreased, onDecreased, onDeleted, orderTotal}) => {
    const [itemsInCart, addItems] = useState<ICartItems[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const open = Boolean(anchorEl);
    
    useEffect(() => {
        addItems(cartItems)
    }, [cartItems]);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (option: string, id: number) => {
        if(option === 'Видалити') {
            onDeleted(id);
            handleClose();
        }
    };

    const classes = useStyles();

    const options = [
        'Додати в обране',
        'Видалити'
    ];

    const ITEM_HEIGHT = 48;

    if(itemsInCart.length === 0) {
        return <h2 className={classes.cartTop}>Кошик порожній</h2>
    } else {
        return (
            <div>
                <ul className={classes.products}>
                    {itemsInCart.map((item: ICartItems, idx: number) => {
                        const {id, title, count, image, total} = item;
                        
                        return (
                            <div className={classes.product} key={id}>
                                <div className={classes.productImage}>
                                    <img src={image}/>
                                </div>
                                <div className={classes.productTitle}>
                                    <span>{title}</span>
                                </div>
                                <div className={classes.productBottom}>
                                    <div className={classes.productQty}>
                                        <button id="minus" className={count == 1 ? classes.disabled : classes.active}
                                            onClick={() => onDecreased(id)}>
                                            <i className="fas fa-minus"/>
                                        </button>
                                        <input type="number" min="1" disabled={true} value={count}/>
                                        <button id="plus" className={classes.active}
                                            onClick={() => onIncreased(id)}>
                                            <i className="fas fa-plus"/>
                                        </button>
                                    </div>
                                    <div className={classes.productPrice}>
                                        <span>{total} &#8372;</span>
                                    </div>
                                </div>
                                <div className={classes.productActions}>
                                    <i className="fas fa-heart"/>
                                    <button onClick={() => onDeleted(id)}>
                                        <i className="fas fa-trash"/>
                                    </button>
                                </div>
                                <div className={classes.more}>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                        className="p-0"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: '20ch',
                                        },
                                        }}
                                    >
                                        {options.map((option) => (
                                        <MenuItem key={option} onClick={() => handleSelect(option, id)}>
                                            {option}
                                        </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            </div>
                        )
                    })} 
                </ul>   
                <div className={classes.total}>
                    <div className={classes.totalPrice}>
                        <span className={classes.totalPriceLabel}>Всього</span>
                        <span className={classes.specialPrice}>{orderTotal} &#8372;</span>
                    </div>
                    <button>Оформити замовлення</button>                  
                </div>              
            </div>
        )
    }
}

export default ShoppingCartTable;