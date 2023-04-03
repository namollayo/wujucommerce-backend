import { Request, Response } from 'express'
import { products } from '../../database'

export const removeProduct = (req: Request, res: Response) => {
    try {
        const productId = req.params.id
        const productIndex = products.findIndex((product)=> product.id === productId)
        if(productIndex === -1){
            res.status(404)
            throw new Error('Product not founded')
        }
        products.splice(productIndex,1)
        return res.status(204).send('Product deleted successfully')
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