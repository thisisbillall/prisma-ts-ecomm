import {Router} from "express"
import { login, SignUp } from "../controllers/auth"

const authRouter:Router = Router()

authRouter.post('/signup',SignUp)
authRouter.post('/login',login)

export default authRouter;