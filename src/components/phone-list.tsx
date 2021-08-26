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
    phoneList : `
        display: grid;
        width: 100%;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill,minmax(240px,1fr));
    `,
    "@media (max-width: 950px)": {
        phoneList: `
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            `
    },
    "@media (max-width: 768px)": {
        phoneList: {
            "&:nth-child(odd)": `
            border-left: none;
            padding-left: 0;
            `,
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gridGap: 0
        }
    }
})

const PhoneList: React.FC<PhoneListProps> = ({ addItem, phones, onItemSelected }) => {
    const [phonesList, addPhonesList] = useState<IPhones[]>([]);
    useEffect(() => {
        addPhonesList(phones);
    }, [phones]);

    const classes = useStyles();

    return (
    <div className={classes.phoneList}>
        {
            phonesList.map((phone) => {
                const {id, ...phoneProps} = phone;
                
                return (  
                    <div key={id}>                        
                        <PhoneListItem 
                            phoneProps={phoneProps} 
                            addItem={() => addItem(id)} 
                            onItemSelected={() => onItemSelected(id)}
                        />                         
                    </div>          
                )
            })
        }
    </div>
    ) 
}

export default PhoneList;