import { Request, Response } from 'express'
import { TProduct, TProductDBPOST, TProductPOST, TPurchase_example } from '../../types'
import { db } from '../../database/knex'
import { TUserDB } from '../../types'

export const createPurchase = async (req: Request, res: Response) => {
    try {
        const { id, buyer, products } = req.body
        
        const purchase :TPurchase_example = {
            id,
            buyer,
            products
        };
               

        for (const key in purchase ) {
            if (purchase [key as keyof TPurchase_example] === undefined) { 
                throw new Error(`${key} must not be undefined`);              
            }
        }

      
        if (typeof id !== "string") {
          res.status(400);
           throw Error("id must be a string");
        }
      
        if (typeof buyer !== "string") {
            res.status(400);
            throw Error("buyer must be a string");
        }
      
        if (!products.length) {
        res.status(400);
        throw Error("Your purchase need to have at least one product");
        }

        
        for (const product of purchase.products) {     
            const productId = product.id
            const { nights, quantity } = product
            
            if (undefined === productId
                || undefined === nights 
                || undefined === quantity
            ) {
                res.status(400);
                throw new Error(`All Product information must be filled in`);
            }

            if(typeof productId !== "string") {
                res.status(400);
                throw new Error(`The product id must be a string`)
            }

            if( typeof nights !== "number" || typeof quantity !== "number") {
                res.status(400);
                throw new Error(`The quantity of nights and of tickets must be a number`)
            }

            if( nights <= 0 || quantity <= 0) {
                res.status(400);
                throw new Error(`the number of tickets and nights purchased must be at least 1`)
            }


            const [ productExist ] :TProduct[] = await db("products").where({ id: productId})

            if (!productExist){ 
                res.status(400);
                throw new Error(`There is no product registered with the id: ${productId} `);    
            }

        }  

        const [ userExist ] :TUserDB[] = await db("users").where({ id: buyer})
        if(!userExist) {
            throw new Error(`There is no user registered with the id: ${buyer}`);
        }

        const [ purchaseExist ] :TUserDB[] = await db("purchases").where({id})
        if(purchaseExist) {
            throw new Error(`There is already a purchase registered with the id: ${id}`);
        }

        const prices = products.map((product :TProductDBPOST)=>{
            const total = product.quantity * (product.price + (product.nights * product.price_night))
            console.log(product);
            return total             
        })        

        const price = prices.reduce(
            (accumulator: number, value: number) => accumulator + value,
            0
          );

          

        const newPurchaseDB = {
            id,
            buyer,
            total_price: price
          };

          await db("purchases").insert(newPurchaseDB);

          products.map(async (product : any) => {
            await db("purchases_products").insert({ 
              purchase_id: id,
              product_id: product.id,
              quantity: product.quantity,
              nights: product.nights,
            });
          });

        return res.status(200).send("Purchase registered with success.")    

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