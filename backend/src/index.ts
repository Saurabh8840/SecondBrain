

import app from "./app";
import { PrismaClient} from "@prisma/client"
import dotenv from "dotenv"


dotenv.config()
const prisma=new PrismaClient();

const port:number=parseInt(process.env.PORT||"5000",10)

async function startServer():Promise<void>{

    try {
        await prisma.$connect();
        console.log("connected to database")
    
        app.listen(port,()=>{
             console.log(`server running on http://localhost:${port}`)
        });
    } catch (error) {
         console.error("Database connection failed: ",error);
         await prisma.$disconnect();
         process.exit(1)
    }
    
}

startServer();
