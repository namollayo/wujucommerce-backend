import { Request, Response } from 'express'
import { products } from '../../database'

export const getProductByName = (req: Request, res: Response)=>{
    const searchedProduct = req.query.product
    const product = products.find((product)=> {
        return product.name.toLowerCase().includes(searchedProduct.toString().toLowerCase())})
    return res.status(200).send(product)
}