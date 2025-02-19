import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../secrets"
import { prismaClient } from ".."

const authMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<void> =>{
    // fetch header
    const token = req.headers.authorization

    // if no token pres throe unauth
    if(!token) 
        throw Error("Unauthorized: no token present!")
    try {
         // if present: verify token
        const payload = jwt.verify(token, JWT_SECRET) as any
        // fetch curr user
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } })

        if(!user)
            throw Error("Unauthorized: no user present!")

        // attach user to curr req
        req.user = user
        next()
    } catch (error) {
        throw Error("Unauthorized: catch!")
    }
   

}

export default authMiddleware