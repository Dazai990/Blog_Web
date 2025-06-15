import React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import About from "../pages/Abou"
import PostForm from "../pages/PostForm"
import MyPosts from "../pages/MyPost"
import Blogs from "../pages/Blogs"
import Contact from "../pages/Contact"

const RouterMain = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login /> }/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/create-blog" element={<PostForm/>}/>
                <Route path="/my-blog" element={<MyPosts/>}/>
                <Route path="/all-blog" element={<Blogs/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default RouterMain