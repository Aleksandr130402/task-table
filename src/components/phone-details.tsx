import React, {useState} from "react";
import { Button, createTheme, ThemeProvider } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import withPhonestoreService from "./hoc/with-phonestore-service";
import { createUseStyles } from "react-jss";
import PhonestoreService from "../services/phonestore-service";
import { useEffect } from "react";
import { IPhones } from "./interfeces";

type PhoneDetailsProps = {
    itemId : number
    phonestoreService : PhonestoreService
    addItem : (id: number) => void
}

const PhoneDetails: React.FC<PhoneDetailsProps> = ({ itemId, phonestoreService, addItem }) => {
    const [renderItem, addRenderItem] = useState<IPhones>({
        id: 0,
        actual: false,
        title : '',
        price: 0,
        coverImage: '',
        brand: ''
    });

    const phones = phonestoreService.getPhones();

    useEffect(() => {
        const newItem = phones.find((phone) => phone.id == itemId);
        if(newItem) {
            addRenderItem(newItem);
        }    
    },[itemId]);

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

    if(renderItem.actual) {
        button = <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" onClick={() => addItem(renderItem.id)}>
            <i className={`fa fa-shopping-cart ${classes.addToCartIcon}`}/>
            Купити
        </Button>
        </ThemeProvider>  
    }   

    return(
        <div>
            <h2>{renderItem.title}</h2>
            <img src={renderItem.coverImage} className={classes.coverImage}/>
            <div>
                <div>{renderItem.actual}</div>
                <div className={classes.phonePrice}>{renderItem.price} &#8372;</div>
                {button}
            </div>
        </div>
    )
}

export default withPhonestoreService()(PhoneDetails);