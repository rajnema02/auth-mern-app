const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        requried:true,
        unique:true,
    },
    password:{
        type:String,
        requried:true,
        unique:true,
    }
});

userSchema.pre("save",async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
    }
    catch(err){
        next(err);
    }
})

//comparePassword
userSchema.methods.comparePassword = async function(providePassword){
    if(!providePassword || !this.password){
        throw new Error("hash and data argument required");
    }
    return await bcrypt.compare(providePassword, this.password);
}

const User = mongoose.model("user",userSchema);

module.exports = User;