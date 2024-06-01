const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();
const cloudinary=require("cloudinary");
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.json({
                success: false,
                message: "User already exist"
            })
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        let user = await User.create({
            name,
            email,
            password: hashPassword
        })
        res.json({
            success: true,
            message: "user created successfully"
        })


    } catch (error) {
        res.json({
            success: false,
            message: "Internal server error"
        })
    }

}
const login = async (req, res) => {


    const { email, password } = req.body;

    try {
        let IsUserExist = await User.findOne({email});
        if(!IsUserExist){
            return res.json({
                success: false,
                message: "Login using valid credential 1"
            })
        }
        let passwordcompare = await bcrypt.compare(password,IsUserExist.password);
        
        if(!passwordcompare){
            return res.json({
                success: false,
                message: "Login using valid credential 2"
            })
            
        }
        let userId = {
            id: IsUserExist._id
        }
        let secretOrPrivateKey="19497awaismalik";
        let token = jwt.sign(userId, secretOrPrivateKey);

        const accessTokenOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            maxAge: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            path:"/"
        }
        if(process.env.NODE_ENV === 'production'){
                accessTokenOptions.secure = true;
                accessTokenOptions.sameSite="None"
        
            }
        res.cookie("access_token",token,accessTokenOptions);
        res.status(200).send({
            success: true,
            message: "user login successfully",
            token,
            IsUserExist
        })


    } catch (error) {
        res.json({
            success: false,
            message: "Internal server error"
        })
    }

}

const logOutUser=(req,res)=>{
const id=req.id;

try {
    let  accessTokenOptions = {
            maxAge: 1,
            httpOnly: true,
            sameSite: "lax",
            path:"/"
        }
     if(process.env.NODE_ENV === 'production'){
                accessTokenOptions.secure = true;
                accessTokenOptions.sameSite="None"
        
            }
    res.cookie("access_token","",accessTokenOptions );
res.json({
    success:true,
    message:"user logout successfully"
})
} catch (error) {
    res.json({
        success: false,
        message: "Internal server error"
    })
}
}
const getUserDetails = async (req, res) => {
    const id = req.id;
    try {
        const user = await User.findOne({ _id: id }).select("-password");

        res.json({
            success: true,
            user
        })

    } catch (error) {
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

const updateAvatar=async(req,res)=>{
    const id=req.id;
    const {avatar}=req.body;    

    try {
        const user = await User.findById(id);
        if(avatar && user){

            if(user.avatar.public_id){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
                
        const myclound= await cloudinary.v2.uploader.upload(avatar ,{
            folder:"avatars",
            width:150        
        });
        user.avatar={
            public_id:myclound.public_id,
            url:myclound.secure_url
        }
            
        }else{
            
        const myclound= await cloudinary.v2.uploader.upload(avatar ,{
                folder:"avatars",
                width:150        
            });
            user.avatar={
                public_id:myclound.public_id,
                url:myclound.secure_url
            }
            
        }
            await user.save();
            
            res.status(200).json({
                success:true,
                user
            })
        
        }
        
  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
  
}
const updateUserInfo=async(req,res)=>{
 const id=req.id;
    const {name}=req.body;    
    try {
        const user = await User.findById({ _id: id }) 
        if(name && user){
            user.name=name;
        }
        await user.save();
        res.status(200).json({
            success:true,
            message:'user updated successfully',
            user
         })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const updateUserPassword=async(req,res)=>{
    const id=req.id;
    const {oldpassword,newpassword}=req.body;

    try {
        if(oldpassword==="" ||newpassword===""){
            return res.status(400).json({
                success:false,
                message:"Please enter oldpassword and newpassword"
        })
    }
        
        const user = await User.findOne({ _id: id }).select("+password"); 
        let comparepassword=await bcrypt.compare(oldpassword,user.password);
        if(!comparepassword){
            return res.status(400).json({
                success:false,
                message:"invalid old Password"
            })
           
           }
           if(user && comparepassword){
            let salt=await bcrypt.genSalt(10);
              let hashPassword=await bcrypt.hash(newpassword,salt);
              user.password=hashPassword
              await user.save();
               res.status(200).json({
                success:true,
                message:"password updated successfully"
            })
           }  
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
module.exports = { register, login, getUserDetails ,updateAvatar,updateUserInfo,updateUserPassword,logOutUser}
