import { Request, Response } from 'express'
import { users } from '../../database'

export const editUser = (req: Request, res: Response) => {
    const { id, name, email, password } = req.body
}