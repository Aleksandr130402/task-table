import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { IPhones } from "../interfeces";

type BrandFilterProps = {
    phones : IPhones[]
    handleChangeCheckbox : (e: React.ChangeEvent<HTMLInputElement>) => void
}

const BrandFilter: React.FC<BrandFilterProps> = ({phones, handleChangeCheckbox}) => {

    function unique(phones : IPhones[]) {
        let arr : any[] = [];
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