import { Request, Response } from 'express'
import { users } from '../../database'

export const removeUser = (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const userIndex = users.findIndex((user)=> user.id === userId)
        if(userIndex === -1){
            res.status(404)
            throw new Error('User not founded')
        }
        users.splice(userIndex,1)
        return res.status(204).send('User deleted successfully')
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