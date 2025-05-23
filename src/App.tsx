import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from './pages/Forgot';
import Projects from "./pages/Category";
import Detail from './pages/Detail';
import CreatePost from './pages/Post';
import AboutUs from "./pages/About";
import EventPage from "./pages/Event";
import ProfilePage from "./pages/Profile";
import ResetPassword from './pages/ResetPassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/about" element={<AboutUs />} />     
        <Route path="/event" element={<EventPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />  
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />           



      </Routes>
    </Router>
  );
}

export default App;
