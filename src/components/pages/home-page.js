import React from "react";
import { withRouter } from "react-router-dom";
import { BrandFilter, PriceFilter } from "../filters";
import PhoneList from "../phone-list";

const HomePage = (props) => { 

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
        filteredPhones,
        history} = props;

    let renderPhones;

    if(priceFilter || brandFilter) {
        renderPhones = filteredPhones;
    } else {
        renderPhones = phones;
    }

    return (
        <>
            <aside>
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
            </aside>
            <PhoneList 
                addItem={(id) => addItem(id)} 
                phones={renderPhones}
                onItemSelected={(id) => {
                    history.push(`/phone/${id}`) 
                }}
            />
        </>                   
    )
}

export default withRouter(HomePage);