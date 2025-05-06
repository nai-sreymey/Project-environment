import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from './pages/Forgot'; // Import ForgotPassword
import Category from "./pages/Category";
import Detail from './pages/Detail';
import CreatePost from './pages/Post'
import CategoryList from './components/CategoryList'; // Adjust the path as needed


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/category" element={< Category/>} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/" element={<CategoryList />} />


        

      </Routes>

      
    </Router>
  );
}

export default App;
