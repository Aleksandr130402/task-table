import React, { ChangeEvent } from "react";
import { Route, Switch } from "react-router-dom";
import { jss } from "react-jss";

import { HomePage } from './pages';
import ShopHeader from "./shop-header";
import withPhonestoreService from "./hoc/with-phonestore-service";
import PhoneDetails from "./phone-details";
import { ICartItems, IPhones } from "./interfeces";
import PhonestoreService from "../services/phonestore-service";

const styles = {
    '@global': {
        body: {
            height: '100%',
            margin: 0
        },
        html: {
            height: '100%',
            margin: 0
        },
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": `
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        `
    },
    appContainer: `
        height: 100%;
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        overflow: hidden;
    `
}

type MyProps = {
    phonestoreService: PhonestoreService
};
type MyState = {
    phones: IPhones[]
    filteredPhones: IPhones[]
    cartItems: ICartItems[]
    numItems: number
    total: number
    orderTotal: number
    firstValue: string
    secondValue: string
    priceFrom: number
    priceTo: number
    priceFilter: boolean
    brandFilter: boolean
    brandCheckBoxes: string[]
};

class App extends React.Component<MyProps, MyState> {
    state : MyState = {
        phones: [],
        filteredPhones: [],
        cartItems: [],
        numItems: 0,
        total: 0,
        orderTotal: 0,
        firstValue: '',
        secondValue: '',
        priceFrom: 0,
        priceTo: 0,
        priceFilter: false,
        brandFilter: false,
        brandCheckBoxes: []
    }
    
    componentDidMount() {
        const data = this.props.phonestoreService.getPhones();
        this.setState({
            phones: data
        });       
    }

    findPhoneInStore(id: number) {
        return this.state.phones.find((phone) => phone.id === id);
    }
    findPhoneIndex(phoneId: number) {
        return this.state.cartItems.findIndex((item) => item.id === phoneId)
    }

    updateCartItem(phone: IPhones, item: ICartItems, quantity: number) {
        
        if(item) {
            return {
                ...item,
                count: item.count + quantity,
                total: item.total + quantity * phone.price 
            }
        } else {
            return {
                id: phone.id,
                title: phone.title,
                count: 1,
                total: phone.price,
                image: phone.coverImage
            }
        }     
    }

    updateCartItems(cartItems: ICartItems[], item: ICartItems, idx: number) {

        if(item.count === 0) {
            return [
                ...cartItems.slice(0, idx),
                ...cartItems.slice(idx + 1)
            ];
        }
        
        if(idx === -1 || undefined) {
            return [
                ...cartItems,
                item
            ];
        }

        return [
            ...cartItems.slice(0, idx),
            item,
            ...cartItems.slice(idx + 1)
        ];
    };

    addedToCart(id: number) {
        const {cartItems, numItems, total, orderTotal} = this.state;

        const phone = this.findPhoneInStore(id);

        if( phone !== undefined) {
            const itemIndex = this.findPhoneIndex(phone.id);
            const item = cartItems[itemIndex];

            const newItem = this.updateCartItem(phone, item, 1);

            this.setState({
                cartItems: this.updateCartItems(cartItems, newItem, itemIndex),
                numItems: numItems + 1,
                total: total + phone.price,
                orderTotal: orderTotal + phone.price
            })
        }
    } 
    onDecreased(id: number) {
        const {cartItems, numItems, total, orderTotal} = this.state;

        const phone = this.findPhoneInStore(id);

        if( phone !== undefined) {

            const itemIndex = this.findPhoneIndex(phone.id);
            const item = cartItems[itemIndex];
            const newItem = this.updateCartItem(phone, item, -1);

            this.setState({
                cartItems: this.updateCartItems(cartItems, newItem, itemIndex),
                numItems: numItems - 1,
                total: total - phone.price,
                orderTotal: orderTotal - phone.price
            })
        }
    }
    onDeleted(id: number) {
        const {cartItems, numItems, total, orderTotal} = this.state;

        const itemIndex = this.findPhoneIndex(id);
        const item = cartItems[itemIndex];

        this.setState({
            cartItems: [
                ...cartItems.slice(0, itemIndex),
                ...cartItems.slice(itemIndex + 1)
            ],
            numItems: numItems - item.count,
            total: total - item.total,
            orderTotal: orderTotal - item.total
        })
    }
    onChangeFirst(e: ChangeEvent<HTMLInputElement>) {
        const firstValue = e.target.value;
        
        this.setState({firstValue})  

        if(firstValue !== '' ) {
            this.setState({
                priceFrom: +firstValue                              
            })
        }
    }
    onChangeSecond(e: ChangeEvent<HTMLInputElement>) {    
        const secondValue = e.target.value; 

        this.setState({secondValue})     

        if(secondValue !== '') {
            this.setState({
                priceTo: +secondValue                              
            })
        }
    }
    sortPrice = () => {
        const {priceFrom, 
            priceTo, 
            phones, 
            brandFilter, 
            filteredPhones} = this.state;
        let filtered;

        if(priceFrom == 0 && priceTo == 0) {
            this.setState({
                priceFilter: false
            })
        }

        if( priceFrom >= 0 && priceTo > 0 ) {

            if( brandFilter ) {
                
                filtered = filteredPhones.filter((phone) => { 
                    return (
                        phone.price > priceFrom && phone.price < priceTo 
                    )});
            } else {
                filtered = phones.filter((phone) => { 
                    return (
                        phone.price > priceFrom && phone.price < priceTo 
                    )});
            }
            
            this.setState({
                filteredPhones: filtered,
                priceFilter: true
            })
        }
        
        this.setState({
            firstValue: '',
            secondValue: ''
        })
    }

    sortBrand = (e: ChangeEvent<HTMLInputElement>) => {
        const {phones, 
            filteredPhones, 
            brandCheckBoxes, 
            priceFilter} = this.state;
        const checkbox = e.target;
        let filtered;

        if(checkbox.checked) {

            filtered = phones.filter((phone) => phone.brand === checkbox.name);
            
            this.setState({
                filteredPhones: filteredPhones.concat(filtered),
                brandFilter: true
            })

            if( priceFilter ) {

                this.sortPrice();
            } 
        }

        if(!checkbox.checked) {
            filtered = filteredPhones.filter((phone) => phone.brand !== checkbox.name);
            
            if(brandCheckBoxes.length === 1) {
                this.setState({
                    filteredPhones: filtered,
                    brandFilter: false
                })
            } else {
                this.setState({
                    filteredPhones: filtered,
                    brandFilter: true
                }) 
            } 
        } 
    }

    handleChangeCheckbox (e: ChangeEvent<HTMLInputElement>) {
        const {brandCheckBoxes} = this.state;
        const checkbox = e.target;

        if( checkbox.checked ) {
            const newItem = checkbox.name;

            this.setState({
                brandCheckBoxes: [
                    ...brandCheckBoxes, 
                    newItem
                    ]
            })
            this.sortBrand(e);
        }
        if( !checkbox.checked ) {
            
            const itemIndex = brandCheckBoxes.indexOf(checkbox.name);
            
            if(itemIndex !== -1) {
                this.setState({
                    brandCheckBoxes: [
                        ...brandCheckBoxes.slice(0, itemIndex),
                        ...brandCheckBoxes.slice(itemIndex + 1)
                    ]
                })
                this.sortBrand(e);
            }
        }
    }
    
    render() {
        const {numItems, 
            total, 
            firstValue, 
            secondValue, 
            priceFrom, 
            priceTo, 
            phones,
            filteredPhones,
            priceFilter,
            brandFilter,
            orderTotal} = this.state;

        const { classes } = jss.createStyleSheet(styles).attach();

        return (
            <div className={classes.appContainer}>
            <ShopHeader numItems={numItems} 
                        cartItems={this.state.cartItems}
                        onIncreased={(id) => this.addedToCart(id)}
                        onDecreased={(id) => this.onDecreased(id)} 
                        onDeleted={(id) => this.onDeleted(id)}
                        orderTotal={orderTotal}
            />              
            <Switch>
                <Route 
                    path="/"
                    render={() => <HomePage 
                        addItem={(id) => this.addedToCart(id)} 
                        phones={phones}
                        firstValue={firstValue} 
                        secondValue={secondValue} 
                        priceFrom={priceFrom}
                        priceTo={priceTo}
                        onChangeFirst={(e) => this.onChangeFirst(e)}
                        onChangeSecond={(e) => this.onChangeSecond(e)}
                        sortPrice={this.sortPrice}
                        handleChangeCheckbox={(e) => this.handleChangeCheckbox(e)}
                        brandFilter={brandFilter}
                        priceFilter={priceFilter}
                        filteredPhones={filteredPhones}
                        />}
                    exact
                />
                <Route
                    path="/phone/:id"
                    render={({match}) => {
                        const {id} = match.params;
                        return (
                            <PhoneDetails 
                                itemId={id} 
                                addItem={(id: number) => this.addedToCart(id)}
                            />
                        )
                    }} 
                />            
            </Switch>
            </div>
        );
    }
}

export default withPhonestoreService()(App);