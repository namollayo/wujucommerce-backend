import { Request, Response } from 'express'
import { db } from '../../database/knex'
import { TPurchaseDB } from '../../types'

export const removePurchase = async (req: Request, res: Response) => {
    try {
            const purchaseId = req.params.id
            const [ purchaseExist ]: TPurchaseDB[] | undefined[] = await db('purchases').where({id: purchaseId})
            
            if(!purchaseExist){
                res.status(404)
                throw new Error('Purchases not founded')
            }
    
            await db('purchases').del().where({id: purchaseId})
            res.status(204).send('Purchases deleted successfully')

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