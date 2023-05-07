import { Request, Response } from 'express'
import { TProductDB, TRAVEL_UNIVERSE } from '../../types'
import { db } from '../../database/knex'


export const editProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id
        const { id, name, price, priceNight, description, universe, image_url, status, createdAt } = req.body
        
        const productModel:TProductDB = {
            id,
            name,
            price,
            priceNight,
            description,
            universe,
            image_url,
            status,
            createdAt
        }

    
        for (const key in productModel) {
                if (productModel[key as keyof TProductDB] !== undefined) {
                    if(key === "price" ||
                     key === "priceNight"||
                     key === "status") {
                        if (typeof productModel[key as keyof TProductDB] !== 'number') {
                            res.status(400)
                            throw new Error(`${key} must be type number`) 
                        }    
                    } else {
                        if (typeof productModel[key as keyof TProductDB] !== "string") {
                            res.status(400)
                            throw new Error(`${key} must be a string`)
                    }
                }
            }
        }

        if(id !== undefined){
            if (id.length < 4 ) {
                res.status(400)
                throw new Error("'id' must have at least 4 characters")
            }
        }

        if(name !== undefined){
            if (name.length < 2 ) {
                res.status(400)
                throw new Error("'name' must have at least 2 characters")
            }
        }

        if(description !== undefined){
            if (description.length < 5 ) {
                res.status(400)
                throw new Error("'description' must have at least 5 characters")
            }
        }
        
        if(price !== undefined || priceNight !== undefined){
            if (price <= 0 || priceNight  <= 0) {
                res.status(400)
                throw new Error("Invalid value of price and price per night")
            }
        }

        if(id !== undefined){
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
        }
            
        if(id !== undefined){
            const [ productIdExist ]:TProductDB[] | undefined[] = await db('products').where({id}) 
            if (productIdExist) {
                res.status(400)
                throw new Error(`This destination's id is already in use: ${ productId}`);   
            }
        }

        if(id !== undefined){
            const [ productNameExist ]:TProductDB[] | undefined[] = await db('products').where({name}) 
            if (productNameExist) {
                res.status(400)
                throw new Error(`This destination's name is already in use: ${name}`);   
            }
        }

        const [ product ]:TProductDB[] | undefined[] = await db('products').where({id: productId})
        if (!product) {
            res.status(404)
            throw new Error("Destination not found");   
        }
        
        const editedProduct : TProductDB ={
            id: id || productId,
            name: name || product.name,
            price: price || product.price,
            priceNight: priceNight || product.priceNight,
            description: description || product.description,
            universe: universe || product.universe,
            image_url: image_url || product.image_url,
            status: status === 0 || 1 ? status : product.status,
            createdAt: createdAt || product.createdAt      
        }
        
        
        await db('products').update(editedProduct).where({id:productId})
        res.status(200).send({
            message: "Product updated successfully",
            editProduct
    })

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
    