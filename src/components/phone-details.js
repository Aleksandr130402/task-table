import React from "react";
import { Button, createTheme, ThemeProvider } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import withPhonestoreService from "./hoc/with-phonestore-service";
import { createUseStyles } from "react-jss";

const PhoneDetails = ({ itemId, phonestoreService, addItem }) => {

    const phones = phonestoreService.getPhones();
    const item = phones.find((phone) => phone.id == itemId);

    let button;

    const theme = createTheme({
        palette: {
            primary: green,
        },
    });  
    
    const useStyles = createUseStyles({
        coverImage: {
            width: "50%"
        },
        phonePrice: {
            fontSize: "30px",
            lineHeight: 1,
            fontWeight: 500,
            marginBottom: "16px"
        },
        addToCartIcon: {
            marginRight: "10px"
        }
    })

    const classes = useStyles();

    if(item.actual) {
        button = <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" onClick={() => addItem(item.id)}>
            <i className={`fa fa-shopping-cart ${classes.addToCartIcon}`}/>
            Купити
        </Button>
        </ThemeProvider>  
    }
    
    return(
        <div>
            <h2>{item.title}</h2>
            <img src={item.coverImage} className={classes.coverImage}/>
            <div className={classes.phoneBottom}>
                <div>{item.actual}</div>
                <div className={classes.phonePrice}>{item.price} &#8372;</div>
                {button}
            </div>
        </div>
    )
}

export default withPhonestoreService()(PhoneDetails);