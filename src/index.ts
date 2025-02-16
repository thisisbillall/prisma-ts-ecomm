import express from 'express'
import { PORT } from '../schema/secrets';

const app = express()

app.get('/', (req, res)=>{
   res.send("Working Server...") ;
});

app.listen(PORT, ()=>{
    console.log("SERVER ON PORT 5000");
});