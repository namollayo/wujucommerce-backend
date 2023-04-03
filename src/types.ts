export type TUser = { 
    id:string,
    name:string,
    email:string,
    password:string 
}

export type TProduct = {
    id:string,
    name:string,
    priceflight:number,
    priceday:number,
    universe:TRAVEL_UNIVERSE
}

export type TPurchase = {
    userId:string,
    productId:string,
    quantity:number,
    totalPrice:number
}

export enum TRAVEL_UNIVERSE {
    AVATAR = 'Avatar',
    MARVEL = 'Marvel',
    STAR_WARS = 'Star Wars'    
}