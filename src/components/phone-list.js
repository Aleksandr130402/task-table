import React, { useEffect, useState } from "react";
import PhoneListItem from './phone-list-item';
import { createUseStyles } from 'react-jss';
import withPhonestoreService from "./hoc/with-phonestore-service";


const useStyles = createUseStyles({
    phoneList : {
        display : 'flex',
        flexWrap: "wrap",
        justifyContent: "space-between",
        listStyle : 'none'
    }
})

const PhoneList = ({ phonestoreService, addItem, phones, onItemSelected }) => {
    const [phonesList, addPhonesList] = useState([]);
    useEffect(() => {
        addPhonesList(phones);
    }, [phones]);
    const classes = useStyles();

    return (
    <ul className={classes.phoneList}>
        {
            phonesList.map((phone) => {
                const {id, ...phoneProps} = phone;
                
                return (  
                    <li key={id}>                        
                        <PhoneListItem 
                            phoneProps={phoneProps} 
                            addItem={() => addItem(id)} 
                            onItemSelected={() => onItemSelected(id)}
                        />                         
                    </li>          
                )
            })
        }
    </ul>
    ) 
}

export default PhoneList;