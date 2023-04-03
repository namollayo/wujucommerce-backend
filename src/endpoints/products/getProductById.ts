import { Request, Response } from 'express'
import { products } from '../../database'

export const getProductsById = (req: Request, res: Response) => {
    const searchId = req.params.id
    const searchProduct = products.find((product)=> product.id === searchId)
    
    return res.status(200).send(searchProduct)
}