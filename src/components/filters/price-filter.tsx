import React, {ChangeEvent} from "react";
import { createUseStyles } from "react-jss";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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
        borderBottom: "1px solid #E0E0E0",
        '& label': {
            marginRight: '10px',
            position: "absolute",
            display: "inline-block"
        },
        '& input': {
            paddingLeft: "34px"
        }
    },
    filterHeader: `
        font-size: 1rem;
        line-height: 16px;
        padding: 20px 0px 16px 0;
    `,
    filterBody: {
        "-webkit-box-sizing": "border-box",
        boxSizing:" border-box",
        maxHeight: "300px",
        overflowY: "auto",
        borderBottom: "8px solid transparent",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    },
    inputWrap: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        marginRight: "20px",
        "& input": {
            height: "40px",
            fontSize: "13px",
            lineHeight: "16px",
            border: "1px solid #e0e0e0",
            marginRight: "20px",
            width: "100%",
            paddingLeft: "34px",
            WebkitBoxSizing: "border-box",
            boxSizing: "border-box",
            borderRadius: "4px"
        },
        "& label": `
            display: inline-block;
            position: absolute;
            top: 52%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            left: 10px;
            font-style: normal;
            color: rgba(95,94,94,0.6);
            font-size: 13px;
            line-height: 16px;
        `
    }
})

const PriceFilter: React.FC<PriceFilterProps> = ({firstValue, secondValue, priceFrom, priceTo, onChangeFirst, onChangeSecond, sortPrice}) => {
    
    const classes = useStyles();
    
    return (
        <div className={classes.priceFilter}>
            <div className={classes.filterHeader}><b>Ціна</b></div>
            <div className={classes.filterBody}>
            <div className={classes.inputWrap}><label>От</label><input id="from" name="От" type="number" placeholder={priceFrom.toString()} value={firstValue} onChange={onChangeFirst} onBlur={sortPrice}/></div>
            <div className={classes.inputWrap}><label>До</label><input id="to" name="До" type="number" placeholder={priceTo.toString()} value={secondValue} onChange={onChangeSecond} onBlur={sortPrice}/></div>
            </div>
        </div>   
    )
}

export default PriceFilter;