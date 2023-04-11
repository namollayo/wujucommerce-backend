import { Request, Response } from 'express'
import { products } from '../../database'

export const getProductByName = (req: Request, res: Response) => {
    try {
        const searchedProduct = req.query.product as string | undefined
        if (searchedProduct.length < 1) {
            res.status(400)
            throw new Error("The product name must have at least one caracter")
        }        
        const product = products.find((product)=> {
            return product.name.toLowerCase().includes(searchedProduct.toString().toLowerCase())
        })
        if (!product) {
            res.status(404)
            throw new Error("Product not found")
        }
        return res.status(200).send(product)
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