import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../Component/FullBlog";
import { Spiner } from "../Component/Spiner";

export const Blog=()=>{
    const {loading,blog}=useBlog({id:String(useParams().id)});
    if(loading){return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center"><Spiner></Spiner></div>
        </div>}
    return(
        <div>
            <FullBlog blog={blog}></FullBlog>
        </div>
    )
}