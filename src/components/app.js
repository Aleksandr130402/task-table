import React from "react";
import { Route, Switch } from "react-router-dom";

import { HomePage, CartPage } from './pages';
import ShopHeader from "./shop-header";
import withPhonestoreService from "./hoc/with-phonestore-service";
import PhoneDetails from "./phone-details";

class App extends React.Component {
    state = {
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

    findPhoneInStore(id) {
        return this.state.phones.find((phone) => phone.id === id);
    }
    findPhoneIndex(phoneId) {
        return this.state.cartItems.findIndex((item) => item.id === phoneId)
    }
    updateCartItems(cartItems, item, idx) {

        if(item.count === 0) {
            return [
                ...cartItems.slice(0, idx),
                ...cartItems.slice(idx + 1)
            ];
        }
        
        if(idx === -1) {
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
    updateCartItem(phone, item = {}, quantity) {
        const { 
            id = phone.id,
            count = 0,
            title = phone.title,
            total = 0 
        } = item;

        return {
            id,
            title,   
            count: count + quantity,
            total: total + quantity * phone.price 
        }             
    }
    addedToCart(id) {
        const {cartItems, numItems, total, orderTotal} = this.state;

        const phone = this.findPhoneInStore(id);
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
    onDecreased(id) {
        const {cartItems, numItems, total, orderTotal} = this.state;

        const phone = this.findPhoneInStore(id);
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
    onDeleted(id) {
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
    onChangeFirst(e) {
        const firstValue = e.target.value;
        
        this.setState({firstValue})  

        if(firstValue !== '' ) {
            this.setState({
                priceFrom: firstValue                              
            })
        }
    }
    onChangeSecond(e) {    
        const secondValue = e.target.value; 

        this.setState({secondValue})     

        if(secondValue !== '') {
            this.setState({
                priceTo: secondValue                              
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
         
                const items = this.checkCheckboxes();
                filtered = items.filter((phone) => { 
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

    sortBrand = (e) => {
        const {phones, 
            filteredPhones, 
            brandCheckBoxes, 
            costFilter,
            priceFrom,
            priceTo} = this.state;
        const checkbox = e.target;
        let filtered;

        if(checkbox.checked) {

            filtered = phones.filter((phone) => phone.brand === checkbox.name);
            
            this.setState({
                filteredPhones: filteredPhones.concat(filtered),
                brandFilter: true
            })

            if( costFilter ) {

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

    handleChangeCheckbox (e) {
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

        return (
            <main role="main" className="container">
            <ShopHeader numItems={numItems} total={total}/>              
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
                                addItem={(id) => this.addedToCart(id)}
                            />
                        )
                    }} 
                />
                <Route
                    path="/cart"
                    render={() => <CartPage 
                        cartItems={this.state.cartItems}
                        onIncreased={(id) => this.addedToCart(id)}
                        onDecreased={(id) => this.onDecreased(id)} 
                        onDeleted={(id) => this.onDeleted(id)}
                        orderTotal={orderTotal}
                        />}
                />             
            </Switch>
            </main>
        );
    }
}

export default withPhonestoreService()(App);