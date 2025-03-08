import { Link } from "react-router-dom"
export const Landing=()=>{
    return <div>
        <div className="border-b flex justify-between px-20 py-5 bg-slate-200 fixed w-screen">
            <div className="fixed"></div>
            <Link to="/" className="flex flex-col justify-center cursor-pointer text-3xl font-bold">Medium</Link>
            <div className="flex ">
                <Link to="/signin" className="m-2 mr-5 text-xl flex flex-col justify-center cursor-pointer">Signin</Link>
                <div className="flex flex-col justify-center">
                    <Link to={"/signup"}>
                    <button type="button" className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-4xl text-md px-5 py-2 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Signup</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex justify-around border-b bg-slate-200 h-screen">
            <div className="mt-20 ml-10">
                <h2 className="text-9xl font-serif">Human</h2>
                <h1 className="text-8xl font-sans">stories & ideas</h1>
                <div className="flex flex-col justify-center pt-4">
                    <h3 className="text-2xl font-sans">A place to read, write, and deepen your understanding</h3>
                </div>
                <Link to={"/signup"}>
                    <button type="button" className="ml-10 mt-10 mb-20 cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-4xl text-xl px-10 py-2 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 font-serif">Start reading</button>
                </Link>
            </div>
            <div className="hidden lg:block ">
                <img src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" alt="" className="h-150 w-140 object-fill"/>
            </div>
        </div>
    </div>
}