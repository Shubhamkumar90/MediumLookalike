/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { Spiner } from "./Spiner"
import { Quote } from "../Component/Quote"
// export let name=""
export const Auth=({type}:{type:"signup"|"signin"})=>{
    const navigate=useNavigate()
    const [buf,setBuf]=useState(false)
    const [postInput,setpostInput]=useState({
        name:"",
        email:"",
        password:""
    })

    async function sendRequest(){
        try {
            setBuf(true)
            const res=await axios.post(`${BACKEND_URL}/api/v1/${type=="signup"?"signup":"signin"}`,postInput)
            setBuf(false)
            const jwt=res.data
            // export const name=jwt.name
            localStorage.setItem("token",jwt.jwt)
            localStorage.setItem("name",jwt.name)
            navigate("/blogs");
        } catch (error) {
            setBuf(false)
            alert(`problem while ${type=="signup"?"signup":"signin"}`)
        }
    }
    if(buf){return <div className="flex h-screen justify-center items-center"><Spiner></Spiner></div>}
    return <div className="grid grid-cols-1 lg:grid-cols-2">
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                    {type=="signin"?"Don't have a account?":"Already have an account?"}
                    <Link className="pl-2 underline" to={type=="signin"?"/signup":"/signin"}>
                        {type=="signin"?"Sign up":"Sign in"}
                    </Link>
                </div>
            </div>
            <div className="pt-4">
                {type=="signup"?<LableInput label="Name" placeholder="John" onChange={(e)=>{
                    setpostInput({...postInput,
                        name:e.target.value,
                    })
                    }}>
                </LableInput>:null}
                <LableInput label="Email" placeholder="John@gmail.com"  onChange={(e)=>{
                    setpostInput({...postInput,
                        email:e.target.value,
                    })
                    }}>
                </LableInput>
                <LableInput label="Password" placeholder="Password" type="password" onChange={(e)=>{
                    setpostInput({...postInput,
                        password:e.target.value,
                    })
                    }}>
                </LableInput>
            </div>
            <button type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={sendRequest}>{type=="signup"?"Sign up":"Sign in"}</button>
        </div>
        </div>
    </div>
    <div className="hidden  lg:block ">
        <Quote></Quote>
    </div>
    </div>
}

interface LableInputType{
    label:string,
    placeholder:string,
    type?:string,
    onChange:(e:unknown)=>void
}
function LableInput({label,placeholder,onChange,type}:LableInputType){
    return <div>
        <label className="block mb-2 text-sm font-bold text-black pt-4">{label}</label>
        <input onChange={onChange} type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}