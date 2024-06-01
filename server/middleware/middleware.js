const jwt=require("jsonwebtoken");
const {config}=require("dotenv");
config();
const middleware=async(request,res,next)=>{

   const {access_token}=request.cookies
           if(!access_token){
               return res.status(401).json({
                success:false,
                message:"Authenication using valid token,29"
            })
           }
   let secretOrPrivateKey="19497awaismalik";
           const data= jwt.verify(access_token,secretOrPrivateKey);
           request.id=data.id;
    next();
}
     




module.exports=middleware;
