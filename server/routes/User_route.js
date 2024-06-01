const express=require("express");
const { register, login, getUserDetails,updateAvatar,updateUserInfo,updateUserPassword,logOutUser } = require("../controllers/User_controller");
const middleware = require("../middleware/middleware");
const User=express.Router();


User.post("/register",register);

User.post("/login",login)

User.get("/logout",middleware,logOutUser)

User.get("/me",middleware,getUserDetails);

User.put("/update-avatar",middleware,updateAvatar);

User.put("/update-user-info",middleware,updateUserInfo);

User.put("/update-user-password",middleware,updateUserPassword);

module.exports={User};