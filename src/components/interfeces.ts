export interface IPhones {
    id: number,
    actual: boolean,
    title : string,
    price: number,
    coverImage: string,
    brand: string
}

export interface ICartItems {
    id: number,
    title: string,
    count: number,
    total: number,
    image: string
}