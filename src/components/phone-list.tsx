import React, { useEffect, useState } from "react";
import PhoneListItem from './phone-list-item';
import { createUseStyles } from 'react-jss';
import { IPhones } from "./interfeces";

type PhoneListProps = {
    addItem : (id: number) => void
    phones : IPhones[]
    onItemSelected : (id: number) => void
}

const useStyles = createUseStyles({
    phoneList : {
        display : 'flex',
        flexWrap: "wrap",
        justifyContent: "flex-start",
        listStyle : 'none'
    }
})

const PhoneList: React.FC<PhoneListProps> = ({ addItem, phones, onItemSelected }) => {
    const [phonesList, addPhonesList] = useState<IPhones[]>([]);
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