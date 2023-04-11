import { Request, Response } from 'express'
import { products } from '../../database'
import { TRAVEL_UNIVERSE } from '../../types'


export const editProduct = (req: Request, res: Response) => {
    const { id, name, priceflight, priceday, universe } = req.body
    const productId = req.params.id
    id as string | undefined
    name as string | undefined
    priceflight as number | undefined
    priceday as number | undefined
    universe as TRAVEL_UNIVERSE | undefined

    const editableProduct = products.find((product)=> product.id === productId)
    if(editableProduct) {
        editableProduct.id = id || editableProduct.id;
        editableProduct.name = name || editableProduct.name;
        isNaN(priceflight)? editableProduct.priceflight : editableProduct.priceflight = priceflight
        isNaN(priceday)? editableProduct.priceday : editableProduct.priceday = priceday
        editableProduct.universe = universe || editableProduct.universe
    }

    return res.status(200).send("Product successfully updated")
}