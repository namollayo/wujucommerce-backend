import { Request, Response } from 'express'
import { db } from '../../database/knex'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string | undefined

        if(searchTerm !== undefined) {
            const result = await db('users').where("NAME","LIKE",`%${searchTerm}%`) 
            return res.status(200).send(result)
        }
        
        const result = await db('users')
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
