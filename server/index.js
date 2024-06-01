const express=require("express");
const cors=require("cors");
const {Note} = require("./routes/Note_route");
const {User} = require("./routes/User_route");
const { Connection } = require("./utils/db");
const CookieParser=require("cookie-parser")
const cloudinary=require("cloudinary").v2;
const {config}=require("dotenv");
const bodyParser = require('body-parser');
config();
const app=express();
Connection()

const option={
    origin:["https://notebook-mern-client.vercel.app"],
    credentials:true,
    method:["GET","POST","PUT","DELETE"]
}
app.use(cors(option))

cloudinary.config({

   cloud_name:dfap4q0r6,
   api_key:482451764432676,
   api_secret:27PyDirrBS0mVQYLpJ71l205fA0
})

app.options("",cors(option))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(CookieParser())



app.use("/api/v1",User);
app.use("/api/v1",Note);


app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"API is Working"
    })
})


app.listen(4000,()=>{
    console.log(`server ready on PORT=4000`);
})
