export type TUser = { 
    id:string,
    name:string,
    email:string,
    password:string 
}
export type TUserDB = { 
    id:string,
    name:string,
    email:string,
    password:string,
    created_at:string 
}

export type TProduct= {
    id:string | undefined,
    name:string | undefined,
    price:number | undefined,
    priceNight:number | undefined,
    description: string | undefined,
    universe:TRAVEL_UNIVERSE | undefined,
    image_url:string | undefined
}

export type TProductDB = {
    id:string | undefined,
    name:string | undefined,
    price:number | undefined,
    priceNight:number | undefined,
    description: string | undefined,
    universe:TRAVEL_UNIVERSE | undefined,
    image_url:string | undefined
    status: number | undefined
    createdAt: string | undefined
}

export type TPurchase = {
    userId:string,
    productId:string,
    quantity:number,
    nights:number,
    totalPrice:number
}

export enum TRAVEL_UNIVERSE {
    ALIEN = 'Alien',
    AVATAR = 'Avatar',
    DC_COMICS = 'Dc Comics',
    DR_WHO = 'Dr. Who',
    DUNA = 'Duna',    
    MARVEL = 'Marvel',
    STAR_TREK = 'Star Trek',
    STAR_WARS = 'Star Wars'    
}