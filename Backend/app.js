const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const User = require('./Models/User');
const userRoutes=require('./Routes/userRoutes')

mongoose.connect('mongodb://127.0.0.1:27017/TextTarka')
.then(() => {
    console.log("DB connected successfully")
})
.catch((err) => {
    console.log("Failed Connection", err);
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.use(cors({
    origin:'http://localhost:5173'
}))



app.use(userRoutes);
app.listen(8080,()=>{
    console.log("Server Connected Successfully at Port 8080");
})
