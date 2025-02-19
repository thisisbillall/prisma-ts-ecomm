import { Request, Response, NextFunction, RequestHandler } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secrets";
import { userSchema } from "../../schema/users";

export const SignUp: RequestHandler = async (req, res, next):Promise<any>  => {
    try {
        const validatedData = userSchema.parse(req.body);
        const { name, email, password } = validatedData;

        let user = await prismaClient.user.findFirst({ where: { email } });
        if (user) return res.status(400).json({ error: "User Already Exists!!!" });

        user = await prismaClient.user.create({
            data: { name, email, password: hashSync(password, 10) }
        });

        res.json(user);
    } catch (error) {
        next(error); // Properly pass errors to Express
    }
};

export const login: RequestHandler = async (req, res, next):Promise<any>  => {
    try {
        const { email, password } = req.body;
        let user = await prismaClient.user.findFirst({ where: { email } });

        if (!user) return res.status(400).json({ error: "Sign up first!!!" });

        if (!compareSync(password, user.password))
            return res.status(401).json({ error: "Wrong Password!!!" });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
};

export const me: RequestHandler = (req, res) => {
    res.json(req.user);
};
