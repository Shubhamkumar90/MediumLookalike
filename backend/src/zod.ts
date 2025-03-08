import z from "zod"
const signupInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    username:z.string().optional()
})
const signinInput=z.object({
    email:z.string().email(),
    password:z.string()
})

const blogPostInput=z.object({
    title:z.string(),
    content:z.string(),
    authorID:z.string().optional()
})

const blogPutInput=z.object({
    title:z.string(),
    content:z.string(),
    published:z.boolean(),
    id:z.string()
})

export{signupInput,signinInput,blogPostInput,blogPutInput}
// export type SignupInput=z.infer<typeof signupInput>     //in different folder