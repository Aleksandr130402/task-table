import React from "react";
import { jss } from "react-jss";
import { Input } from "@material-ui/core";

const styles = {
    '@global': {
        label: {
            marginRight: '10px'
        }
    },
    priceFilter: {
        marginBottom: '1rem'
    }
}

const {classes} = jss.createStyleSheet(styles).attach();

const PriceFilter = ({firstValue, secondValue, priceFrom, priceTo, onChangeFirst, onChangeSecond, sortPrice}) => {
    return (
        <div className={classes.priceFilter}>
            <h2>Ціна</h2>
            <label>От</label><Input id="from" type="number" maxLength="6" placeholder={priceFrom.toString()} value={firstValue} onChange={(e) => onChangeFirst(e)} onBlur={sortPrice}></Input>
            <label>До</label><Input id="to" type="number" maxLength="6" placeholder={priceTo.toString()} value={secondValue} onChange={(e) => onChangeSecond(e)} onBlur={sortPrice}></Input>
        </div>   
    )
}

export default PriceFilter;