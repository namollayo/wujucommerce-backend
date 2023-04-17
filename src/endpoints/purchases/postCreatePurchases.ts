import { Request, Response } from 'express'
import { TProduct_Purchase, TPurchase_Product } from '../../types'
import { db } from '../../database/knex'

export const createPurchase =(req: Request, res: Response) => {
    try {
        const { id, buyer, totalPrice, products } = req.body
        
        const newPurchase:TPurchase_Product = {
            id,
            buyer,
            totalPrice,
            products
        };
               

        for (const key in newPurchase) {
            if (newPurchase[key as keyof TPurchase_Product] === undefined) { 
                throw new Error(`${key} must not be undefined`);              
            }
        }
        
        for (const product of newPurchase.products) {     
            const { purchaseId, productId, nights, quantity } = product
            if (undefined === purchaseId 
                || undefined === productId
                || undefined === nights 
                || undefined === quantity
            ) {
                throw new Error(`All Product information must be filled in`);
            }
        }  
        
                
        return res.status(200)            
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