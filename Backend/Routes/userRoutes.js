const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User = require('../Models/User');
const bcrypt=require('bcrypt');
const generatetoken=require('./jsonwebtoken');

//register
router.post('/signup',async (req,res)=>{
    try{
        let user=req.body.formData;
        let email=await User.findOne({email:user.email});
        if(email!=null){
            return res.status(400).send("User has Already regiser. Please register with another id.");
            // res.redirect('/signup');
        }
        else{
            let hashedPass=await bcrypt.hash(user.password,10);
            let newUser=await User.create({
                username:user.username, 
                email:user.email, 
                password:hashedPass
            });
            return res.send("User created Successfully");
        }
    }
    catch(error){
        console.error("Error while registering:", error);
        return res.status(500).send("Internal server error");
    }
})



//login
router.post('/login',async (req,res)=>{
    try{
        let userData=req.body.formData;
        let userInfo ;
        try {
            userInfo = await User.findOne({ email: userData.email });
        } catch (err) {
            res.send("something went wrong while DB login process");
        }
        if (!userInfo) {
            return res.status(400).send("User does not exist. Please register first.");
        }
        let validatedPass=await bcrypt.compare(userData.password, userInfo.password)
        .catch((err)=>{
            return res.status(400).send(err);
        });

        if(!validatedPass){
            return res.status(400).send("Incorrect Credentials");
        }
        
        //generate JWT(Json Web tokens)
        let token=await generatetoken(userInfo);
        
        return res.send({
            data:{
                token:token,
                userData:userInfo
            }, 
            expiresIn:"30d",
            msg:"Login Successfull",
            userId: userInfo._id.toString()
        });

    }
    catch(error){
        console.error("Error while logging in:", error);
        return res.status(500).send("Internal server error");
    }
    
});


router.get('/logout', (req, res) => {
    try {
        res.clearCookie('token'); 
        res.status(200).send("Logout successful");
    } catch (error) {
        console.error("Error while logging out:", error);
        res.status(500).send("Internal server error");
    }
});


module.exports=router;
