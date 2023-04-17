import { Request, Response } from 'express'
import { TPurchase } from '../../types'
import { db } from '../../database/knex'

export const createPurchase =(req: Request, res: Response) => {
    try {
        const { id, buyer, totalPrice, products} = req.body
        const {  userId, productId, nights, quantity } = products
    

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