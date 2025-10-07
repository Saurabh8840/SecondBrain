import { Request,Response } from "express"
import {z} from  "zod"
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();


export const addContent=async(req:Request,res:Response)=>{

    const contentSchema = z.object({
  type: z.enum(["image", "video", "article", "audio"]),
  link: z.url(),
  title: z.string().min(1).max(200),
  tags: z.array(z.string().min(1)) // array of strings
});

const parsed = contentSchema.safeParse(req.body);

if (!parsed.success) {
  return res.status(400).json({ errors: parsed.error.issues });
}

const { type, link, title, tags } = parsed.data;


    try {
        //@ts-ignore
    const userId=req.user.id;

    const content = await prisma.content.create({
        data:{
            type,
            link,
            title,
            authorId:userId,
            tags:{
                connectOrCreate:tags.map((t: string) => ({
                    where: { title: t }, // Ensure 'title' is a unique field in your Prisma schema
                    create: { title: t } //create if it doesn't exist
                }))
            }

        },
        include:{
            tags:true,
            author:{select:{username:true}}

        }
    });

    res.status(201).json(content)
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"something went wrong"})
    }


}

export const fetchContent=async(req:Request,res:Response)=>{
    
    try {
        //@ts-ignore
    const userId = req.user.id;

    const contents = await prisma.content.findMany({
      where: { authorId: userId },
      include: { tags: true },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(contents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching content" });
  }
}


export const removeContent=async(req:Request,res:Response)=>{
        

   try {
      const {contentId}=req.params;
      //@ts-ignore
      const userId=req.user.id;
 
      const content = await prisma.content.findUnique({
       where: { id: Number(contentId) }
     });
 
      if (!content || content.authorId !== userId) {
       return res.status(404).json({ message: "Content not found" });
     }
 
 

 
     await prisma.content.delete({ where: { id: Number(contentId) } });
     res.status(200).json({ message: "Content deleted" });
 
     
   } catch (error) {
     res.status(400).json({ message: "Error deleting content" });
   }



}

