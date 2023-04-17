import { Request, Response } from 'express'
import { TProduct } from '../../types'
import { db } from '../../database/knex'
import { TRAVEL_UNIVERSE } from '../../types'

export const createProduct = async (req: Request, res: Response)=>{
    try {
        const { id, name, price, priceNight, description, universe, image_url } = req.body
        
        const newProduct:TProduct ={
            id,
            name,
            price,
            priceNight,
            description,
            universe,
            image_url
        }

 
        for (const key in newProduct) {
                if (newProduct[key as keyof TProduct] === undefined) {
                    res.status(400)
                    throw new Error(`all fields must be filled in`)
                } 
                
                if(key === "price" || key === "priceNight") {
                    if (typeof newProduct[key as keyof TProduct] !== 'number') {
                        res.status(400)
                        throw new Error(`${key} must be type number`) 
                    }    
                } else {
                    if (typeof newProduct[key as keyof TProduct] !== "string") {
                        res.status(400)
                        throw new Error(`${key} must be a string`)
                }
            }
        }

  
        if (id.length < 4 ) {
            res.status(400)
            throw new Error("'id' must have at least 4 characters")
        }
        
        if (name.length < 2 ) {
            res.status(400)
            throw new Error("'name' must have at least 2 characters")
        }

        if (description.length < 5 ) {
            res.status(400)
            throw new Error("'description' must have at least 5 characters")
        }
        
        if (price <= 0 || priceNight  <= 0) {
            res.status(400)
            throw new Error("Invalid value of price and price per night")
        }

        if (universe !== TRAVEL_UNIVERSE.ALIEN &&
            universe !== TRAVEL_UNIVERSE.AVATAR &&
            universe !== TRAVEL_UNIVERSE.DC_COMICS &&
            universe !== TRAVEL_UNIVERSE.DR_WHO &&
            universe !== TRAVEL_UNIVERSE.DUNA &&
            universe !== TRAVEL_UNIVERSE.MARVEL &&
            universe !== TRAVEL_UNIVERSE.STAR_TREK && 
            universe !== TRAVEL_UNIVERSE.STAR_WARS) {
                res.status(400)
                throw new Error("Invalid value of universe")
            }
              
        const [ productIdExist ]:TProduct[] | undefined[] = await db('products').where({id})
        if (productIdExist) {
            res.status(400)
            throw new Error("id already in use");   
        }
        
        const [ productNameExist ]:TProduct[] | undefined[] = await db('products').where({name}) 
        if (productNameExist) {
            res.status(400)
            throw new Error("this destination already exist");   
        }
        
        
        await db('products').insert(newProduct)
        res.status(201).send({message: "Successfully registered product."})

    } catch (error) {        
        if (res.statusCode === 200) {
            res.status(500)
        }
        if ( error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
}
