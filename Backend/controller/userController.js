const User = require("../model/userModel");
const Jwt = require("jsonwebtoken");

const signUp = async(req,res,next)=>{
    try{
        const dataUser = await User(req.body);
        const {email}  = dataUser;

        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(400).json({message:"user already exist"})
        }
        const savedUser = await dataUser.save();
        res.status(200).json({message:"user registered successfully"});
    }
    catch(err){
        return res.status(500).json({err:"internal error occur"});
    }
}
const login = async(req,res,next)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        console.log("User:",user);

        if(!user){
            return res.status(400).json({message:"invalid email credentials"});
        }

        const isMatch = await user.comparePassword(password);
        console.log("Password match",isMatch);

        if(!isMatch){
            return res.status(400).json({message:"Invalid password credentials"});
        }
        if(!email || !password){
            return res.status(400).json({message:"email and password are required"});
        }
        const Token = Jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn:"1h"});
        res.status(200).json({Token});
        console.log("Generated Token", Token);
    }
    catch(err){
        console.log("login Error:",err);

        res.status(500).json({err:"server error"});
    }
}

module.exports = {
    signUp,
    login
}