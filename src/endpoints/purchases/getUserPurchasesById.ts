import { Request, Response } from 'express'
import { db } from '../../database/knex'

export const getPurchasesById = async (req: Request, res: Response) => {
    try {
        const searchId = req.params.id as string | undefined

        if(searchId === undefined) {
            res.status(404)
            throw new Error("Invalid id"); 
        }

        
        const [ purchaseExist ] = await db("purchases").where({id:searchId})

        if(!purchaseExist) { 
            res.status(404)
            throw new Error("There is no purchase with this id"); 
        }

        const [ purchase ] = await db("purchases")
        .where(
            "purchases.id", "=", `${searchId}`
        )
        .innerJoin(
            "users",
            "users.id",
            "=",
            "purchases.buyer"
        )
        .select(
            "purchases.id AS purchaseId",
            "purchases.buyer AS buyerId",
            "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt",
            "purchases.paid AS isPaid",
            db.raw(
                "case when purchases.paid = 0 then 'false' else 'true' end AS isPaid"
              )
        )
            
        const products = await db("products")
        .where("purchases_products.purchase_id", "=", `${searchId}`)
        .innerJoin("purchases_products","purchases_products.product_id","=","products.id")
        .select("products.id", "products.name", "products.price", "products.price_night AS pricePerNight", "purchases_products.nights", "purchases_products.quantity", "products.description", "products.image_url AS imageUrl")

        const result = { ... purchase, products}
    

        return res.status(200).send(result)

    
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