import { Appbar } from "../Component/Appbar"
import { BlogCard } from "../Component/BlogCard"
import { BlogSkeleton } from "../Component/BlogSkeleton";
import { useBlogs } from "../hooks"
export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if(loading){return <div>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
    </div>}
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
            <div >
                {blogs.map(blog=><BlogCard id={blog.id} authorName={blog.author.name||"Anonymus"} title={blog.title} 
                content={blog.content} publishedDate="23 Feburary 2025"></BlogCard>)}
            </div>
        </div>
    </div>
}