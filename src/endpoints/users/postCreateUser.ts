import { Request, Response } from 'express'
import { TUser, TUserDB } from "../../types"
import { db } from '../../database/knex'

export const createUser = async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body
        
        const newUser : TUser = {
            id,
            name,
            email,
            password
        }

        for (const key in newUser) {
            if (newUser[key as keyof TUser] === undefined) {
                res.status(400)
                throw new Error(`All fields must be filled in`)
            } 
            if (typeof newUser[key as keyof TUser] !== "string") {
            res.status(400)
            throw new Error(`${key} must be a string`)
            }
        }

        
        if (id.length < 4 ) {
            res.status(400)
            throw new Error("'id' must have at least 4 characters")
        }

        
        if (name.length < 2 ) {
            res.status(400)
            throw new Error("'name' must have at least 2 characters")
        }
        
        
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            res.status(400)
            throw new Error("Please enter a valid email") 
        }
        
        
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new Error("'password' must have from 8 to 12 characters and must contain a number, an upper case and an lower case letter, and a special character")
        }
        
        const [ userIdExist ]:TUserDB[] | undefined[] = await db('users').where({id})
        if (userIdExist) {
            res.status(400)
            throw new Error("id already in use");   
        }
        
        const [ userEmailExist ]:TUserDB[] | undefined[] = await db('users').where({email}) 
        if (userEmailExist) {
            res.status(400)
            throw new Error("email already in use");   
        }
        
        
        await db('users').insert(newUser)
        res.status(201).send({message: "New user registered successfully"})

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