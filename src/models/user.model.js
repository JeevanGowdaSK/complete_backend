import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const userSchema = new Schema(
    {

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index:true

        },
        avatar:{
            type:String,  // cloudinary url
            required:true,


        },
        coverImage:{
            type:String, // cloudinary url

        },
        watchHistory:[
            // will be an array
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,'password is required']
        },
        refreshToken:{
            type:string
        }

    },
    {timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            usernme:this.username,
            fullName:thise.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expirenIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.genrateRefeshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expirenIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)