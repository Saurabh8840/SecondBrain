import express from "express"
import cors from "cors";
const app= express();
import cookieParser from "cookie-parser"

//parse json data into req.body
app.use(express.json())

//cors to allow domain from this origin and also thier cookies 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//html form data from frontend
app.use(express.urlencoded({extended:true}))

//this let server static files like images and css ,js
app.use(express.static("public"))

//cookies setup
app.use(cookieParser())
//cors 

//rouesetup
import UserRouter from "./router/users.routes.js"
import ContentRouter from "./router/content.route.js"
import ShareRouter from "./router/share.route.js"

app.use("/api/auth",UserRouter)
app.use("/api/content",ContentRouter)
app.use("/api/brain",ShareRouter)










export default app;