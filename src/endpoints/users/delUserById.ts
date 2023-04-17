import { Request, Response } from 'express'
import { TUser, TUserDB } from "../../types"
import { db } from '../../database/knex'

export const removeUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const [ userExist ]: TUserDB[] | undefined[] = await db('users').where({id: userId})
        
        if(!userExist){
            res.status(404)
            throw new Error('User not founded')
        }

        await db('users').del().where({id: userId})
        res.status(204)

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