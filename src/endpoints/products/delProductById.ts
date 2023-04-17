import { Request, Response } from 'express'
import { db } from '../../database/knex'
import { TProductDB } from '../../types'

export const removeProduct = async (req: Request, res: Response) => {
    try {
            const productId = req.params.id
            const [ productExist ]: TProductDB[] | undefined[] = await db('products').where({id: productId})
            
            if(!productExist){
                res.status(404)
                throw new Error('Product not founded')
            }
    
            await db('products').del().where({id: productId})
            res.status(204).send('Product deleted successfully')

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