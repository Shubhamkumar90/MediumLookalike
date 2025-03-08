import axios from "axios"
import { Appbar } from "../Component/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish=()=>{
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("")
    const navigate=useNavigate()
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block p-2.5" placeholder="Title"></input>
                <TextEditor onChange={(e)=>{
                        setContent(e.target.value)
                    }}></TextEditor>
                <button type="submit" onClick={async()=>{
                    const res=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,content
                    },{headers:{Authorization:localStorage.getItem("token")}})
                    navigate(`/blog/${res.data.id}`)
                }} className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200">Publish Post</button>
            </div>
        </div>
    </div>
}

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <div>
        <div className="w-full mb-4 mt-4">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish Post</label>
                    <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required></textarea>
                </div>
            </div>
        </div>
    </div>
}