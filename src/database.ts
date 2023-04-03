import { TUser, TProduct, TPurchase, TRAVEL_UNIVERSE } from './types'

export const users: TUser[] = [
    { 
        id : "u001",
        name: "Diluc", 
        email: "mondstadtbatman@gmail.com",
        password: "123654"
    },
    { 
        id : "u002",
        name: "Kaeya", 
        email: "thebestfavonius@gmail.com",
        password: "4884884"
    }
]

export const products: TProduct[] = [
    {
        id:"1",
        name:"Pandora",
        priceflight:12500,
        priceday:2500,
        universe: TRAVEL_UNIVERSE.AVATAR
    },
    {
        id:"3",
        name:"Vormir",
        priceflight:15000,
        priceday:1000,
        universe: TRAVEL_UNIVERSE.MARVEL
    }
]

export const purchases: TPurchase[] = [
    {
        userId: users[0].id,
        productId: products[0].id,
        quantity: 1 ,
        totalPrice: 1 * products[0].priceflight + products[0].priceday
    },
    {
        userId: users[0].id,
        productId: products[1].id,
        quantity: 1 ,
        totalPrice: 1 * products[1].priceflight + products[1].priceday
    },
]