// import { PrismaClient } from "@prisma/client";
// import { safeParse, z } from "zod";
// import { Request, Response } from "express";
// import { comparePassword, hashedPassword } from "../utils/password";
// import { generateAccessToken, generateRefreshToken } from "../utils/token";
// const passwordValidation = new RegExp(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;"'<,>.?/=-])[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;"'<,>.?/=-]{8,20}$/
// );
// const prisma = new PrismaClient();

// const generateAccessTokenAndRefreshToken = async (userId: number): Promise<{ refreshToken: string; accessToken: string }> => {
//     try {
//         const refreshToken = generateRefreshToken(userId);
//         const accessToken = generateAccessToken(userId);

//         await prisma.user.update({
//             where: {
//                 id: userId,
//             },
//             data: {
//                 refreshToken:refreshToken,
//             },
//         });
//         return { refreshToken, accessToken };
//     } catch (error) {
//         throw new Error("failed to generate tokens");
//     }
// };


// export const registerUser=async(req:Request,res:Response):Promise<void>=>{

//     //check validation 

//     // const {username,email,password}=req.body;

    
    
//     const schema=z.object({

//         username:z.string().min(3).max(20),
//         email:z.email(),
//         password:z.string()
//     })

//     const result=schema.safeParse(req.body);

//     if(!result.success){
//         res.status(400).json({ errors: result.error.issues})
//         return
//     }

//     const {username,email,password}=result.data;

//     const existingUser=await prisma.user.findUnique({
//         where:{
//             email
//         }
//     })
//     if(existingUser){
//          res.status(400).json({message:"user already exists"})
//          return
//     }
//     const hashedpwd = await hashedPassword(password)
//     const user = await prisma.user.create({
//         data: {
//             email,
//             password: hashedpwd,
//             username
//         }
//     })

//     const newUser={

//         username:user.username,
//         email:user.email

//     }

//     if(!user){
//         res.status(400).json({message:"unable to create user"})
//         return

//     }else{
//         res.status(200).json({message:"user created successfully",newUser})
//         return
//     }


// }

// export const loginUser=async(req:Request,res:Response):Promise<Response>=>{

    

//     const schema=z.object({
//         email:z.email(),
//         password:z.string().regex(passwordValidation,{
//             message:"password must be between 8-10 and contain a uppercase,number,Special character"
//         })
//     })

//     const result=schema.safeParse(req.body);
//     if(!result.success){
//         return res.status(400).json({message:"check input "})
//     }

//     const {email,password}=result.data;

//     const existingUser=await prisma.user.findUnique({
//         where:{
//             email
//         }
//     })

//     if(!existingUser){
//         return res.status(404).json({
//             message:"user not found"
//         })
//     }

//     const checkPassword=await comparePassword(password,existingUser.password)

     
//     if(!checkPassword){
//         return res.status(400).json({message:"Password is wrong"})
//     }


    

//         //i have to generate accestoken and refresh token okk 
    
//     const {accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(existingUser.id);

//     const user={
//         id:existingUser.id,
//         username:existingUser.username,
//         email:existingUser.email

//     }

//     const options={
//         httpOnly:true,
//         secure:true
//     }

//     //collect user detail to return in res.
//     return res.status(200).json({
//         message:"User logged in successfully",
//         user,
//         accessToken

//     }).cookie("accessToken",accessToken,options)
// }



import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { Request, Response } from "express";
import { comparePassword, hashedPassword } from "../utils/password";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

const prisma = new PrismaClient();

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;"'<,>.?/=-])[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;"'<,>.?/=-]{8,20}$/
);

const generateAccessTokenAndRefreshToken = async (
  userId: number
): Promise<{ refreshToken: string; accessToken: string }> => {
  try {
    const refreshToken = generateRefreshToken(userId);
    const accessToken = generateAccessToken(userId);

    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new Error("Failed to generate tokens");
  }
};

// 🟢 REGISTER USER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const schema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().regex(passwordValidation, {
      message:
        "Password must be 8–20 characters and include uppercase, lowercase, number, and special character.",
    }),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error.issues });
    return;
  }

  const { username, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashedPwd = await hashedPassword(password);
  const user = await prisma.user.create({
    data: { username, email, password: hashedPwd },
  });

  res.status(201).json({
    message: "User created successfully",
    user: { username: user.username, email: user.email },
  });
};

// 🟣 LOGIN USER
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Check input" });
  }

  const { email, password } = result.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const validPassword = await comparePassword(password, existingUser.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Password is wrong" });
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(existingUser.id);

  const options = {
    httpOnly: true,
    secure: false, // set true only in production (https)
    sameSite: "lax" as const,
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    },
    accessToken,
  });
};
