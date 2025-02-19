import {Router} from "express"
import { login, me, SignUp } from "../auth"
import authMiddleware from "../../middlewares/auth"

const authRouter:Router = Router()

authRouter.post('/signup',SignUp)
authRouter.post('/login',login)
authRouter.get('/me', authMiddleware, me)


export default authRouter;