export default class PhonestoreService {

    getPhones() {
        return [
            {
                id: 1,
                actual: true,
                title : 'Xiaomi Poco M3 4/128',
                price: 4999,
                coverImage: 'https://ringoo.ua/img/192/192/resize/catalog/product/_/4/_41776_6.png',
                brand: 'xiaomi'
            },
            {
                id: 2,
                actual: false,
                title : 'Xiaomi Redmi Note 5',
                price: 5999,
                coverImage: 'https://ringoo.ua/img/192/192/resize/catalog/product/_/4/_41355_9.png',
                brand: 'xiaomi'
            },
            {
                id: 3,
                actual: true,
                title : 'Apple iPhone SE 2020 Slim Box',
                price: 16599,
                coverImage: 'https://ringoo.ua/img/192/192/resize/catalog/product/a/p/apple-iphone-se-2020-128gb-black-mhgt3-slim-box-01.jpg',
                brand: 'iphone'
            
            },
            {
                id: 4,
                actual: true,
                title : 'Samsung Galaxy A52 4/128GB',
                price: 9999,
                coverImage: 'https://ringoo.ua/img/192/192/resize/catalog/product/s/a/samsung_galaxy_a52_4128gb_1_1.jpg',
                brand: 'samsung'
                
            }
        ];
    } 
}