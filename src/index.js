const express = require('express');
const cors = require('cors');
const { PORT, MONGO_URL } = require('./config');
const mongoose = require('mongoose')
const app = express();
app.use(express.json());
app.use(cors());
const {userRouter} = require('./router')

app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.status(200).send({message:'working fine'});
})




app.listen(PORT,async()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("connected to db");

    }catch(error){
        console.log(`db connection error: ${error}`);

    }
   
})