import React from "react";
import { Button } from "@material-ui/core";
import { createUseStyles } from 'react-jss';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from "@material-ui/core/colors";

const theme = createTheme({
    palette: {
        primary: green,
    },
});

const useStyles = createUseStyles({
    phoneListItem : {
        margin : '15px 0',
        flexGrow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "20px",
        height: "395px",
        width: "254px",
        border: "1px solid #E0E0E0"
    },
    phoneCover: {       
        width: '120px',
        marginRight: '30px'
    },
    phoneImage: {
        maxWidth: '100%',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    phoneTitle: {
        fontSize: "1.2rem",
    },
    phonePrice: {
        fontSize: "1.4rem"
    },
    phoneBottom: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between"
    }
})
const PhoneListItem = ({ phoneProps, addItem, onItemSelected }) => {
    
    const { actual, title, price, coverImage } = phoneProps;

    const classes = useStyles();
    let button;

    if(actual) {
        button = <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" onClick={addItem}>
                <i className="fa fa-shopping-cart"/>
            </Button>
            </ThemeProvider>       
    }
    return (
        <div className={classes.phoneListItem}>
            <div className={classes.phoneCover}>
                <img src={coverImage} alt="phone-image" className={classes.phoneImage} onClick={onItemSelected}/>
            </div>
            <div className={classes.phoneActual}>{actual ? 'В наявності' : 'Немає'}</div>
            <div className={classes.phoneTitle}>{title}</div> 
            <div className={classes.phoneBottom}>
                <div className={classes.phonePrice}>{price} &#8372;</div>
                {button}
            </div>          
        </div>
    )
}

export default PhoneListItem;