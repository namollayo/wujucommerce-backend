import { Request, Response } from 'express'
import { purchases } from '../../database'
import { TPurchase } from '../../types'

export const createPurchase =(req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice } = req.body
    const newPurchase : TPurchase ={
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)
    return res.status(201).send("Purchase Successfully Done")
}