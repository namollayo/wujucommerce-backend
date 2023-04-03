import { Request, Response } from 'express'
import { users } from "../../database"
import { TUser } from "../../types"

export const createUser = (req: Request, res: Response) => {
    const { id, name, email, password } = req.body
    const newUser : TUser = {
        id,
        name,
        email,
        password
    }

    users.push(newUser)
    return res.status(201).send('Registration Successfully Done')
}