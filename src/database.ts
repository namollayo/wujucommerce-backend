import { TUser, TProduct, TPurchase } from './types'

export const users: TUser[] = [
    { 
        id : "paçoca",
        email: "lala@gmail.com",
        password: "123654"
    }
]

export const products: TProduct[] = [
    {
        id:"P1",
        name:"Pandora",
        price:150000,
        category: "travel"
    }
]

export const purchases: TPurchase[] = [
    {
        userId: users[0].id,
        productId: products[0].id,
        quantity: 1 ,
        totalPrice: 1 * products[0].price
    }
]