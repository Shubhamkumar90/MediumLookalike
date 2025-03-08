import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from "hono/jwt"
import { blogPostInput, blogPutInput } from '../zod'

export const blogRoute= new Hono<{
  Bindings:{DATABASE_URL:string,JWT_SECRET:string},
  Variables:{userId:String}
}>()


blogRoute.use('/*',async(c,next)=>{
    const head=c.req.header("Authorization")||""
    // console.log(head)
    // const token=head.split(" ")[1]
    const response=await verify(head,c.env.JWT_SECRET)
    // const user=await decode(token)
    if(response.id){
        c.set('userId',String(response.id))
      await next()
    }else{
      c.status(403)
      return c.json({error:"Unauthorized"})
    }
})
  
blogRoute.get('/id/:id',async(c) => {   //c=context
    const prisma=new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    const blog=await prisma.post.findUnique({where:{id:c.req.param('id')},select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{name:true}
      }
    }});
    console.log(blog)
    if(!blog){return c.json({msg:"No Post Found"})}
    return c.json({blog})
})
  
  
blogRoute.get('/blogs',async(c)=>{
    const prisma=new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    const blogs=await prisma.post.findMany({select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{name:true}
      }
    }})
    // console.log(blogs)
    return c.json({blogs})
})


blogRoute.post('/', async(c) => {
    const userid=c.get("userId");
    const body=await c.req.json();
    const prisma=new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate())
    const suc=blogPostInput.safeParse(body)
    if(!suc.success){c.status(411);return c.json({msg:"Wrong Input"});}
    var msg="";
    try{
      const post=await prisma.post.create({
        data:{
          title:body.title,
          content:body.content,
          authorID:String(userid)
        }
      })
      console.log(post)
      msg="Success id: "+post.id
      return c.json({id:post.id})
    }catch(e){c.status(500);return c.json({msg:"problem"})}
    // return c.json({id:post.id})
})


blogRoute.put('/', async(c) => {
    const prisma=new PrismaClient({datasourceUrl:c.env.DATABASE_URL}).$extends(withAccelerate());
    const body=await c.req.json();
    // const pub=body.visible=="true"?true:false
    var msg=""
    const suc=blogPutInput.safeParse(body)
    if(!suc.success){c.status(411);return c.json({msg:"Wrong input"})}
    try {
      const upd=await prisma.post.update({
        where:{id:body.id},
        data:{title:body.title,content:body.content,published:body.published}
      })
      msg="Success"
    } catch (error) {
      c.status(500)
      msg="problem"
    }
    return c.json({msg})
})