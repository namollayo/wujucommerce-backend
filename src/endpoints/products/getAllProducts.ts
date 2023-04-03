import { Request, Response } from 'express'
import { products } from '../../database'

export const getAllProducts = (req: Request, res: Response) => {
    return res.status(200).send(products)
}