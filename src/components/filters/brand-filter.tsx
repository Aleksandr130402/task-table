import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { IPhones } from "../interfeces";
import { createUseStyles } from "react-jss";

type BrandFilterProps = {
    phones : IPhones[]
    handleChangeCheckbox : (e: React.ChangeEvent<HTMLInputElement>) => void
}

const useStyles = createUseStyles({
    filterHeader: `
        font-size: 1rem;
        line-height: 16px;
        padding: 20px 0px 16px 0;
    `,
    filterBody: `
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        max-height: 300px;
        border-bottom: 8px solid transparent;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    `,
    brandFilter: `
        border-bottom: 1px solid #E0E0E0;
    `
});

const BrandFilter: React.FC<BrandFilterProps> = ({phones, handleChangeCheckbox}) => {

    const classes = useStyles();

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
        <div className={classes.brandFilter}>
            <div className={classes.filterHeader}>
                <b>Бренд</b>
            </div>
            <div className={classes.filterBody}>
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
        </div>   
    )
}

export default BrandFilter;