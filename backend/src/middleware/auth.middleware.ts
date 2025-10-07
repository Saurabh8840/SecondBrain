import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";

dotenv.config()
const prisma=new PrismaClient();

export const verifyjwt = async (req:Request, res:Response, next:NextFunction)=> {
     
    try {
        const token=req.cookies.token||req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            return res.status(400).json({message:"user not found"})
        }
        
        if (!process.env.ACCESS_TOKEN_SECRET) {
            return res.status(500).json({ message: "ACCESS_TOKEN_SECRET is not set in environment variables" });
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)as{id:number};
        
        const user=await prisma.user.findUnique({
            where:{id:decodeToken.id},
            select:{
                id:true,
                username:true,
                email:true
            }
        })
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        //@ts-ignore
        req.user=user;
    
        next();
    
    } catch (error) {
        console.error("Token verificatin error:",error);
        return res.status(401).json({message:"invalid or expired token "})
    }


}