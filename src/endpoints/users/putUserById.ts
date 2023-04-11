import { Request, Response } from 'express'
import { users } from '../../database'

export const editUser = (req: Request, res: Response) => {
    const { id, name, email, password } = req.body
    const userId = req.params.id
    id as string | undefined
    name as string | undefined
    email as string | undefined
    password as string | undefined

    const editableUser = users.find((user)=> user.id === userId)
    if(editableUser) {
        editableUser.id = id || editableUser.id;
        editableUser.name = name || editableUser.name;
        editableUser.email = email || editableUser.email
        editableUser.password = password || editableUser.password
    }
    return res.status(200).send("Register successfully updated")
}