import { Request, Response } from 'express'
import { products } from '../../database'
import { TProduct } from '../../types'

export const createProduct = (req: Request, res: Response)=>{
    const { id, name, priceflight, priceday, universe } = req.body
    const newProduct : TProduct ={
        id,
        name,
        priceflight,
        priceday,
        universe
    }

    products.push(newProduct)
    return res.status(201).send('Successfully registered product.')
}