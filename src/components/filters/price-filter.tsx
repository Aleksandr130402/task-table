import React, {ChangeEvent} from "react";
import { createUseStyles } from "react-jss";
import { Input } from "@material-ui/core";

type PriceFilterProps = {
    firstValue : string 
    secondValue : string
    priceFrom : number
    priceTo : number
    onChangeFirst : (e: ChangeEvent<HTMLInputElement>) => void
    onChangeSecond : (e: ChangeEvent<HTMLInputElement>) => void
    sortPrice : () => void
}

const useStyles = createUseStyles({
    priceFilter: {
        marginBottom: '1rem',
        '& label': {
            marginRight: '10px',
            position: "absolute",
            display: "inline-block"
        },
        '& input': {
            paddingLeft: "34px"
        },
    }
})

const PriceFilter: React.FC<PriceFilterProps> = ({firstValue, secondValue, priceFrom, priceTo, onChangeFirst, onChangeSecond, sortPrice}) => {
    
    const classes = useStyles();
    
    return (
        <div className={classes.priceFilter}>
            <h2>Ціна</h2>
            <label>От</label><Input id="from" name="От" type="number" placeholder={priceFrom.toString()} value={firstValue} onChange={onChangeFirst} onBlur={sortPrice}></Input>
            <label>До</label><Input id="to" name="До" type="number" placeholder={priceTo.toString()} value={secondValue} onChange={onChangeSecond} onBlur={sortPrice}></Input>
        </div>   
    )
}

export default PriceFilter;