import { Request, Response } from 'express'
import { users } from "../../database"
import { TUser } from "../../types"

export const createUser = (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        const newUser : TUser = {
            id,
            name,
            email,
            password
        }
    
        // if (!id || !name || !email || !password) {
        //     if()
        //     res.status(400)
        //     throw new Error("");
        // }

        users.push(newUser)
        return res.status(201).send('Registration Successfully Done')
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