import React from "react";
import { Button } from "@material-ui/core";
import { createUseStyles } from 'react-jss';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from "@material-ui/core/colors";

type PhoneProps = {
    actual: boolean
    title : string
    price: number
    coverImage: string
    brand: string
}

type PhoneListItemProps = {
    phoneProps : PhoneProps
    addItem : () =>  void 
    onItemSelected : () =>  void  
}

const theme = createTheme({
    palette: {
        primary: green,
    },
});

const useStyles = createUseStyles({
    phoneListItem :{     
        border: "1px solid #E0E0E0",
        height: "395px",
        display: "flex",
        padding: "16px",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "4px"
    },
    mb: {

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
    },
    phoneActions: {
        position: "absolute",
        zIndex: 1,
        right: "12px",
        top: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& i': `
                cursor: pointer;
                color: #595858;
                -webkit-box-sizing: content-box;
                box-sizing: content-box;
                border-radius: 4px;
                padding: 4px;
        `,
        '& i:first-child': {
            marginBottom: "8px"
        }
    },
    "@media (max-width: 500px)": {
        phoneListItem: `
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        `
    },
    
})

const PhoneListItem: React.FC<PhoneListItemProps> = ({ phoneProps, addItem, onItemSelected }) => {
    
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
            <div className={classes.phoneActions}>
                <i className="far fa-heart"/>
                <i className="fas fa-balance-scale"/>
            </div>
            <div className={classes.phoneCover}>
                <img src={coverImage} alt="phone-image" className={classes.phoneImage} onClick={onItemSelected}/>
            </div>
            <div>{actual ? 'В наявності' : 'Немає'}</div>
            <div className={classes.phoneTitle}>{title}</div> 
            <div className={classes.phoneBottom}>
                <div className={classes.phonePrice}>{price} &#8372;</div>
                {button}
            </div>          
        </div>
    )
}

export default PhoneListItem;