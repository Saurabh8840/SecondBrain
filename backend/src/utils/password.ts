import bcrypt from "bcrypt"


export async function  hashedPassword(password:string):Promise<string> {

    return await bcrypt.hash(password,10)
    
}

export async function comparePassword(plainPassword:string,hashedPassword:string):Promise<boolean> {
    return await bcrypt.compare(plainPassword,hashedPassword);
}