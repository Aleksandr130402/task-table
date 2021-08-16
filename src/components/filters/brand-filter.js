import {FormControlLabel, Checkbox } from "@material-ui/core";
import React from "react";

const BrandFilter = ({phones, handleChangeCheckbox}) => {

    function unique(phones) {
        let arr = [];
        for (let phone of phones) {

            if(!arr.includes(phone.brand)) {
                arr.push(phone.brand);
            }
        }
        return arr;
    }

    return (
        <div>
            <h2>Бренд</h2>
            {
            unique(phones).map((brand, index) => {
                return (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox onChange={handleChangeCheckbox} name={brand}/>}
                        label={brand}
                    />
                )               
            })
            }
        </div>   
    )
}

export default BrandFilter;