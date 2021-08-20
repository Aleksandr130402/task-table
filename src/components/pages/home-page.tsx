import React, {ChangeEvent} from "react";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router-dom";
import { BrandFilter, PriceFilter } from "../filters";
import { IPhones } from "../interfeces";
import PhoneList from "../phone-list";

type HomePageProps = {
    addItem : (id: number) => void
    phones : IPhones[]
    firstValue : string
    secondValue : string
    priceFrom : number
    priceTo : number
    onChangeFirst : (e: ChangeEvent<HTMLInputElement>) => void
    onChangeSecond : (e: ChangeEvent<HTMLInputElement>) => void
    sortPrice : () => void
    handleChangeCheckbox : (e: ChangeEvent<HTMLInputElement>) => void
    priceFilter : boolean
    brandFilter : boolean
    filteredPhones : IPhones[] 
}

const HomePage: React.FC<HomePageProps> = (props) => { 

    const useStyles = createUseStyles({
        category: {
            display: "flex"
        },
        container: {
            padding: "0 16px"
        },
    })

    const classes = useStyles();

    const history = useHistory();

    const {addItem, 
        phones, 
        firstValue, 
        secondValue, 
        priceFrom, 
        priceTo, 
        onChangeFirst, 
        onChangeSecond, 
        sortPrice,
        handleChangeCheckbox,
        priceFilter,
        brandFilter,
        filteredPhones} = props;

    let renderPhones;

    if(priceFilter || brandFilter) {
        renderPhones = filteredPhones;
    } else {
        renderPhones = phones;
    }

    return (
        <div className={`${classes.category} ${classes.container}`}>
            <div>
                <PriceFilter 
                    firstValue={firstValue} 
                    secondValue={secondValue} 
                    priceFrom={priceFrom}
                    priceTo={priceTo}
                    onChangeFirst={(e) => onChangeFirst(e)}
                    onChangeSecond={(e) => onChangeSecond(e)}
                    sortPrice={sortPrice}
                />
                <BrandFilter 
                    phones={phones}
                    handleChangeCheckbox={(e) => handleChangeCheckbox(e)}
                />
            </div>
            <div>
                <PhoneList 
                addItem={(id: number) => addItem(id)} 
                phones={renderPhones}
                onItemSelected={(id: number) => {
                    history.push(`/phone/${id}`) 
                }}
                />
            </div>       
        </div>                   
    )
}

export default HomePage;