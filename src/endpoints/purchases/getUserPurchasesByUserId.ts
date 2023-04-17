// import { Request, Response } from 'express'
// import { purchases } from '../../database'
// import { TPurchase } from '../../types'

// export const getUserPurchasesByUserId = (req: Request, res: Response) => {
//     const userId = req.params.id
//     const purchasesByUser: TPurchase[] = []
//     purchases.forEach((purchase)=> {
//         if (purchase.userId === userId) {
//             purchasesByUser.push(purchase)
//         }
//     })
//     return res.status(200).send(purchasesByUser)
// }