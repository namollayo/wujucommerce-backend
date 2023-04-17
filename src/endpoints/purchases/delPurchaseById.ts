import { Request, Response } from 'express'
import { TPurchase } from "../../types"
import { db } from '../../database/knex'

export const removePurchase = async (req: Request, res: Response) => {
    try {
        const purchaseId = req.params.id
        const [ purchaseExist ]: TPurchase[] | undefined[] = await db('purchases').where({id: purchaseId})
        
        if(!purchaseExist){
            res.status(404)
            throw new Error('Purchase not founded')
        }

        await db('purchases').del().where({id: purchaseId})
        res.status(200)

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