import express, { query } from 'express'
import { PORT } from '../secrets';
import rootRouter from './controllers/routes';
import { PrismaClient } from '@prisma/client';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));  

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log:['query']
})

app.listen(PORT, ()=>{
    console.log(`SERVER ON PORT ${PORT}`);
});