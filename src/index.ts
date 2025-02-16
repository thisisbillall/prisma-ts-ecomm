import express from 'express'

const app = express()

app.get('/', (req, res)=>{
   res.send("Working Server...") ;
});

app.listen(5000, ()=>{
    console.log("SERVER ON PORT 5000");
});