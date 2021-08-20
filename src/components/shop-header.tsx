import React from "react";
import { createUseStyles, jss } from 'react-jss';
import { Link } from "react-router-dom";

type ShopHeaderProps = {
    numItems: number,
    total: number
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
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        justify-content: center;
        -webkit-box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
        box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
        height: 67px;`
    ,
    headerLogo: {
        fontFamily: "Roboto, sans-serif",
        fontSize: "1.5rem",
        textAlign: "center"
    },
    headerRight: {
        alignSelf: "center",
        fontSize: "1rem",     
        paddingRight: "1rem",
        display: "flex",
        alignItems: "center",
        justifySelf: "flex-end",
        '& i': {
            color: "#595858"
        }
    },
    headerButton: {
        paddingLeft: "12px",
        height: "100%",
        width: "100%",
        borderRight: "1px solid #dcdcdc",
        borderBottom: "none",
        borderTop: "none",
        borderLeft: "none",
        backgroundColor: "rgba(0,0,0,0)",
        textAlign: "start"
    },
    headerLeft: {
        height: "100%",
        '& i': {
            marginRight: "16px"
        }
    },
    mr: {
        marginRight: "16px"
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
    "@media (max-width: 767px)": {
        headerButton: {
            borderRight: "none!important",
            display: "none"
        }
    }  
};

const ShopHeader: React.FC<ShopHeaderProps> = ({numItems, total}): JSX.Element => {
const {classes} = jss.createStyleSheet(styles).attach();

    return (
        <header className={`${classes.shopHeader} ${classes.container}`}>
            <div className={classes.headerLeft}>
                <button className={classes.headerButton}>
                    <i className="fas fa-th-large"/>
                    <span>Каталог товарів</span>
                </button>
            </div>
            <div className={`${classes.headerLogo} text-dark`}>
                <Link to="/">
                Store
                </Link> 
            </div>       
            <div className={classes.headerRight}>
                <a href="#" className={classes.mr}>
                <i className="fas fa-search"/>
                </a>
                <a href="#" className={classes.mr}>
                <i className="fas fa-balance-scale"/>
                </a>
                <Link to="/cart" className={classes.mr}>
                <i className="fa fa-shopping-cart"/>
                </Link>
                <a href="#" className={classes.mr}>
                <i className="far fa-heart"/>
                </a>
                <a href="#">
                <i className="far fa-user-circle"/>
                </a>
            </div>              
        </header>
    )
}

export default ShopHeader;