const jwt = require("jsonwebtoken");
const {resolve} = require("path");

module.exports ={
    assignAccessToken:(userId)=>{
        return new Promise((req,res,next)=>{
            const payload ={

            }
            const secret = process.env.JWT_SECRET;
            const options ={
                expireIn:"1h",
                issuser :'pickur.com',
                audience:"userId"
            };
            jwt.sign(payload, secret,options,(err,token)=>{
                if(err) rejects(err)
                    resolve(token)
            })
        }) 
    }
}