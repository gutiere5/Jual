import { Request, Response } from 'express'
import { prismaClient } from '..'
import { hashSync } from 'bcrypt'

export const signup = async (req: Request, res: Response) => {
    const { email, username, password } = req.body

    let user = await prismaClient.user.findFirst({ where: { email } })
    if (user) {
        throw new Error('User already exists')
    }

    user = await prismaClient.user.create({
        data: {
            email,
            username,
            password: hashSync(password, 10), // Note: In a real application, make sure to hash the password before storing it
        },
    })

    res.json(user)
}