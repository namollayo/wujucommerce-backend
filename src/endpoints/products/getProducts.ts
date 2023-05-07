import { Request, Response } from 'express'
import { db } from '../../database/knex'

export const getProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string | undefined

        if(searchTerm !== undefined) {
            const result = await db('products')
            .where("name","LIKE",`%${searchTerm}%`)
            .orWhere("universe","LIKE",`%${searchTerm}%`) 
            .select('id','name','price',"price_night as priceNight",
            'description','universe','image_url as imageUrl' )
            if(result.length <= 0 ) {
                res.status(404)
                throw new Error("Product not found")
            }
            return res.status(200).send(result)
        }
        
        const result = await db('products').select('id','name','price',"price_night as priceNight",
            'description','universe','image_url as imageUrl' )
        return res.status(200).send(result)

    
    } catch(error) {        
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