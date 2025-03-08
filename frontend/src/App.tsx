import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import { Blog } from './pages/Blog'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Landing } from './pages/Landing'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/' element={<Landing></Landing>}></Route>
          <Route path='/signin' element={<Signin></Signin>}></Route>
          <Route path='/blog/:id' element={<Blog></Blog>}></Route>
          <Route path='/blogs' element={<Blogs></Blogs>}></Route>
          <Route path='/publish' element={<Publish></Publish>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
