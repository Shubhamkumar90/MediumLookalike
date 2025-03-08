import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from "hono/jwt" 
import { signinInput, signupInput } from "../zod";

export const userRoute = new Hono<{
    Bindings:{DATABASE_URL:string,JWT_SECRET:string}
}>();

userRoute.post('/signup',async (c) => {
  const prisma=new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
  const body=await c.req.json()
  const suc=signupInput.safeParse(body)
  if(!suc.success){c.status(411);return c.json({msg:"wrong input"})}
  try {
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name:body.username
      }
    })
    const token=await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({jwt:token})
  } catch (error) {
    c.status(403)
    return c.text("Either user alredy exist or there is a server problem")
  }
})

userRoute.post('/signin', async(c) => {
  const prisma=new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
  const body=await c.req.json()
  const suc=signinInput.safeParse(body)
  if(!suc.success){c.status(411);return c.json({msg:"Wrong input"})}
  const user=await prisma.user.findUnique({where:{email:body.email,password:body.password}});
  if(!user){
    c.status(403);
    return c.json({error:"user not found"})
  }
  // console.log(user.id)
  const jwt=await sign({id:user.id},c.env.JWT_SECRET)
  return c.json({jwt,name:user.name});
})