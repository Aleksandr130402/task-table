import { Button, Input, List, ListItem, ListItemText, SwipeableDrawer } from "@material-ui/core";
import React from "react";
import { jss } from 'react-jss';
import { Link } from "react-router-dom";
import { ICartItems } from "./interfeces";
import ShoppingCartTable from "./shopping-cart-table";

type Anchor = 'left' | 'right';

type ShopHeaderProps = {
    numItems: number
    cartItems : ICartItems[]
    onIncreased : (id: number) => void 
    onDecreased : (id: number) => void   
    onDeleted : (id: number) => void  
    orderTotal : number 
}

const styles = {
    '@global': {
        a: {
            textDecoration: 'none'
        }
    },
    container: {
        padding: "0 16px"
    },
    shopHeader: `
        margin-bottom: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        justify-content: center;
        height: 67px;
    `,
    headerContainerWrap: `
        -webkit-box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
        box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
    `,
    headerLogo: {
        fontFamily: "Roboto, sans-serif",
        fontSize: "1.5rem",
        justifySelf: "center"
    },
    headerRight: {
        alignSelf: "center",
        fontSize: "1rem",     
        display: "flex",
        alignItems: "center",
        justifySelf: "flex-end",
        
        '& i': {
            color: "#595858",
            padding: "8px"
        }
    },
    headerButton: `
        height: 100%;
        width: 100%;
        border-top: none;
        border-left: none;
        border-right: 1px solid #dcdcdc;
        padding-left: 12px;
        border-bottom: none;
        background-color: rgba(0,0,0,0);
        justify-content: flex-start;
    `,
    headerLeft: {
        height: "100%",
        maxWidth: "260px",
        '& i': {
            marginRight: "16px"
        }
    },
    mr: {
        marginRight: "16px"
    },
    relative: {
        position: "relative"
    },
    productCount: `
        top: 0;
        left: 50%;
        padding: 0 4px;
        font-size: 11px;
        min-width: 16px;
        background: #ee2c39;
        font-style: normal;
        min-height: 16px;
        line-height: 16px;
        border-radius: 20px;
        position: absolute;
        color: white;
    `,
    cartButton: `
        border: none;
        background-color: rgba(0,0,0,0);
        padding: 0;
    `,
    leftBar: `
        height: 100%;
        width: 350px;
    `,
    rightBar: `
        width: 100%;
        max-width: 550px;
        min-width: 320px;
    `,
    closeBar: {
        color: "#e0e0e0",
        display: "block",
        textAlign: "end",
        padding: "10px",
        '&:hover': {
            color: '#4f4f4f',
            cursor: 'pointer'
        }
    },
    mobileMenu: `
        display: none
    `,
    searchPanel: {
        position: "relative",
        padding: "0 16px 0 56px",
        display: "none",
        "& i": `
            position: absolute;
            left: 16px;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
        `,
        "& input": `
            border: none;
            width: 100%;
            height: 40px;
            padding: 0 16px;
            outline: 0;
            font-size: 14px;
            line-height: 16px;
            color: #1a1919;
        `
    },
    searchButton: {
        display: "block"
    },
    "@media (max-width: 1270px)": {
        headerButton: {
            width: "290px"
        }
    },
    "@media (max-width: 1200px)": {
        headerButton: {
            width: "256px",
            padding: 0
        }
    },
    "@media (max-width: 991px)": {
        headerButton: {
            width: "230px"
        }
    },
    "@media (max-width: 768px)": {
        shopHeader: {
            height: "55px",
            marginBottom: 0
        },
        headerButton: {
            borderRight: "none!important",
            display: "none"
        },
        headerLeft: {
            height: "auto",
            "& i": {
                marginRight: 0
            }
        },
        mobileMenu: `
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 24px;
            cursor: pointer;
        `,
        searchButton: {
            display: "none"
        },
        searchPanel: `
            display: block;
            font-size: 15px;
            padding-left: 56px;
            margin-bottom: 1rem;
        `
    },
    "@media only screen and (max-width: 768px)": {
        headerLeft: `
            width: unset;
            margin-right: 15px;
        `,
        searchPanel: `  
            font-size: 15px;
            padding-left: 56px;
        `
    }
}

const ShopHeader: React.FC<ShopHeaderProps> = ({numItems, cartItems, onIncreased, onDecreased, onDeleted, orderTotal}): JSX.Element => {

    const {classes} = jss.createStyleSheet(styles).attach();

    const [state, setState] = React.useState({
        left: false,
        right: false
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.MouseEvent
    ) => {
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => {
        let listItems;

        if(anchor === 'left') {
            listItems = <List>
            {['Головна', 
            'Apple', 
            'Cмартфони і телефони', 
            'Ноутбуки, планшети, ПК',
            'Телевізори та відео', 
            'Гаджети', 
            'Навушники та аудіо', 
            'Game Zone',
            'Аксесуари', 
            'Xiaomi', 
            'Побутова техніка', 
            'Автотовари', 
            'Персональний транспорт',
            'Дитячі товари'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        }

        if(anchor === 'right') {
            listItems = <ShoppingCartTable 
                cartItems={cartItems} 
                onIncreased={(id) => onIncreased(id)} 
                onDecreased={(id) => onDecreased(id)} 
                onDeleted={(id) => onDeleted(id)}
                orderTotal={orderTotal}
            />
        }

        return (
            <div role="presentation" className={(anchor === 'right')? classes.rightBar : classes.leftBar}>
                <i className={`fas fa-times ${classes.closeBar}`} onClick={toggleDrawer(anchor, false)}/>
                {listItems}
            </div>
        )
    }
      
    let span: {} | null | undefined;        
    // отобразить к-во элементов в корзине
    if(numItems) {
        span = <span className={classes.productCount}>{numItems}</span>
    }

    return (
        <header>
            <div className={classes.headerContainerWrap}>
                <div className={classes.container}>
                    <div className={`${classes.shopHeader}`}>
                        <div className={classes.headerLeft}>
                            <Button className={classes.headerButton} onClick={toggleDrawer('left', true)}>
                                <i className="fas fa-th-large"/>
                                <span>Каталог товарів</span>
                            </Button>
                            <div className={classes.mobileMenu} onClick={toggleDrawer('left', true)}><i className="fas fa-bars"/></div>
                        </div>
                        <div className={`${classes.headerLogo} text-dark`}>
                            <Link to="/">
                            Store
                            </Link> 
                        </div>       
                        <div className={classes.headerRight}>
                            <a href="#" className={`${classes.mr} ${classes.searchButton}`}>
                                <i className="fas fa-search"/>
                            </a>
                            <a href="#" className={classes.mr}>
                                <i className="fas fa-balance-scale"/>
                            </a>
                            <button onClick={toggleDrawer('right', true)} className={`${classes.mr} ${classes.relative} ${classes.cartButton}`}>
                                <i className={`fa fa-shopping-cart `}/>
                                {span}
                            </button>
                            <a href="#" className={classes.mr}>
                                <i className="far fa-heart"/>
                            </a>
                            <a href="#">
                                <i className="far fa-user-circle"/>
                            </a>
                        </div> 
                    </div> 
                </div>
                <div className={classes.searchPanel}>
                    <i className="fas fa-search"/>
                    <input placeholder="Знайти продукт або бренд"/>
                </div>
            </div>
            {(['left', 'right'] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
                <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                    {list(anchor)}
                </SwipeableDrawer>  
            </React.Fragment>
            ))}          
        </header>
    )
}

export default ShopHeader;