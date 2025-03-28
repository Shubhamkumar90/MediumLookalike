import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    content:string,
    title:string,
    author:{name:string}
    id:string
}

export const useBlogs=()=>{
    const[loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([])
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/blogs`,{headers:{Authorization:" "+localStorage.getItem("token")}}).then(res=>{
            setBlogs(res.data.blogs)
            setLoading(false)
        })
    },[])
    return{loading,blogs}
}

export const useBlog=({id}:{id:string})=>{
    const[loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<Blog>()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/id/${id}`,{headers:{Authorization:" "+localStorage.getItem("token")}}).then(res=>{
            setBlog(res.data.blog)
            setLoading(false)
        })
    },[id])
    return{loading,blog}
}