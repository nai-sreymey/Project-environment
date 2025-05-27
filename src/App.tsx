import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Category";
import Detail from './pages/Detail';
import CreatePost from './pages/Post';
import AboutUs from "./pages/About";
import EventPage from "./pages/Event";
import ProfilePage from "./pages/Profile";
import EventDetail from "./pages/EventDetail";
import ResetPassword from './pages/ResetPassword';
import ByMePage from "./pages/BymePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/detail" element={<Detail />} />
        {/* <Route path="/projects" element={<Category />} /> */}
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/about" element={<AboutUs />} />     
        <Route path="/event" element={<EventPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />  
        <Route path="/event/:id" element={<EventDetail />} />  
        <Route path="/reset-password" element={<ResetPassword />} />           
        <Route path="/byme" element={<ByMePage  />} />           



      </Routes>
    </Router>
  );
}

export default App;
